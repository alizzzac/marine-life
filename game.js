// Main game logic for Fish Facts Candy Crush
class FishFactsCandyCrush {
    constructor() {
        this.board = [];
        this.boardSize = 8;
        this.score = 0;
        this.totalScore = 0;
        this.moves = 25;
        this.currentLevel = 1;
        this.target = 1000;
        this.selectedTile = null;
        this.isProcessing = false;
        this.gameOver = false;
        this.levelComplete = false;
        
        // DOM elements
        this.scoreElement = document.getElementById('score');
        this.movesElement = document.getElementById('moves');
        this.targetElement = document.getElementById('target');
        this.currentLevelElement = document.getElementById('currentLevel');
        this.gameBoard = document.getElementById('gameBoard');
        
        // Modals
        this.fishFactModal = document.getElementById('fishFactModal');
        this.levelCompleteModal = document.getElementById('levelCompleteModal');
        this.gameOverModal = document.getElementById('gameOverModal');
        this.gameCompleteModal = document.getElementById('gameCompleteModal');
        
        // Load saved progress
        const progress = loadProgress();
        this.currentLevel = progress.currentLevel;
        this.totalScore = progress.totalScore;
        
        this.init();
        this.bindEvents();
    }
    
    init() {
        this.loadLevel(this.currentLevel);
        this.generateBoard();
        this.renderBoard();
        this.removeInitialMatches();
        this.updateUI();
    }
    
    loadLevel(level) {
        const config = getLevelConfig(level);
        this.currentLevel = level;
        this.target = config.target;
        this.moves = config.moves;
        this.score = 0;
        this.gameOver = false;
        this.levelComplete = false;
        
        // Update UI
        this.currentLevelElement.textContent = level;
        this.targetElement.textContent = config.target;
        updateProgressBar(0, config.target);
    }
    
    generateBoard() {
        this.board = [];
        for (let row = 0; row < this.boardSize; row++) {
            this.board[row] = [];
            for (let col = 0; col < this.boardSize; col++) {
                let fishType;
                let attempts = 0;
                
                // Prevent initial matches
                do {
                    fishType = getRandomFish(this.currentLevel);
                    attempts++;
                } while (attempts < 10 && this.wouldCreateMatch(row, col, fishType));
                
                this.board[row][col] = fishType;
            }
        }
    }
    
    wouldCreateMatch(row, col, fishType) {
        // Check horizontal match
        if (col >= 2) {
            if (this.board[row][col-1]?.emoji === fishType.emoji && 
                this.board[row][col-2]?.emoji === fishType.emoji) {
                return true;
            }
        }
        
        // Check vertical match
        if (row >= 2) {
            if (this.board[row-1][col]?.emoji === fishType.emoji && 
                this.board[row-2][col]?.emoji === fishType.emoji) {
                return true;
            }
        }
        
        return false;
    }
    
    renderBoard() {
        this.gameBoard.innerHTML = '';
        
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                const tile = document.createElement('div');
                tile.className = `tile ${this.board[row][col].class}`;
                tile.textContent = this.board[row][col].emoji;
                tile.dataset.row = row;
                tile.dataset.col = col;
                
                this.gameBoard.appendChild(tile);
            }
        }
    }
    
    bindEvents() {
        // Tile selection
        this.gameBoard.addEventListener('click', this.handleTileClick.bind(this));
        
        // Button events
        document.getElementById('restartBtn').addEventListener('click', this.restartLevel.bind(this));
        document.getElementById('hintBtn').addEventListener('click', this.showHint.bind(this));
        document.getElementById('continueBtn').addEventListener('click', this.hideFishFact.bind(this));
        document.getElementById('nextLevelBtn').addEventListener('click', this.nextLevel.bind(this));
        document.getElementById('playAgainBtn').addEventListener('click', this.restartGame.bind(this));
        document.getElementById('playFromStartBtn').addEventListener('click', this.restartGame.bind(this));
        
        // Touch events for mobile
        if (isTouchDevice()) {
            this.gameBoard.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
            this.gameBoard.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
            this.gameBoard.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: false });
        }
    }
    
    handleTileClick(event) {
        if (this.isProcessing || this.gameOver || this.levelComplete) return;
        
        const tile = event.target.closest('.tile');
        if (!tile) return;
        
        const row = parseInt(tile.dataset.row);
        const col = parseInt(tile.dataset.col);
        
        if (this.selectedTile) {
            if (this.selectedTile.row === row && this.selectedTile.col === col) {
                this.clearSelection();
            } else if (this.isAdjacent(this.selectedTile, { row, col })) {
                this.swapTiles(this.selectedTile, { row, col });
            } else {
                this.selectTile(tile, row, col);
            }
        } else {
            this.selectTile(tile, row, col);
        }
    }
    
    selectTile(tile, row, col) {
        this.clearSelection();
        this.selectedTile = { row, col, element: tile };
        tile.classList.add('selected');
    }
    
    clearSelection() {
        if (this.selectedTile) {
            this.selectedTile.element.classList.remove('selected');
            this.selectedTile = null;
        }
    }
    
    isAdjacent(tile1, tile2) {
        const rowDiff = Math.abs(tile1.row - tile2.row);
        const colDiff = Math.abs(tile1.col - tile2.col);
        return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
    }
    
    async swapTiles(tile1, tile2) {
        if (this.isProcessing) return;
        
        this.isProcessing = true;
        
        // Animate swap
        await this.animateSwap(tile1, tile2);
        
        // Swap in board array
        const temp = this.board[tile1.row][tile1.col];
        this.board[tile1.row][tile1.col] = this.board[tile2.row][tile2.col];
        this.board[tile2.row][tile2.col] = temp;
        
        // Check for matches
        const matches = this.findMatches();
        
        if (matches.length === 0) {
            // No matches, swap back
            const tempBack = this.board[tile1.row][tile1.col];
            this.board[tile1.row][tile1.col] = this.board[tile2.row][tile2.col];
            this.board[tile2.row][tile2.col] = tempBack;
            
            await this.animateSwap(tile2, tile1);
            this.renderBoard();
            playSound(200, 300, 'square');
        } else {
            // Valid move
            this.moves--;
            this.updateUI();
            await this.processMatches();
            this.checkLevelStatus();
        }
        
        this.clearSelection();
        this.isProcessing = false;
    }
    
    async animateSwap(tile1, tile2) {
        const element1 = document.querySelector(`[data-row="${tile1.row}"][data-col="${tile1.col}"]`);
        const element2 = document.querySelector(`[data-row="${tile2.row}"][data-col="${tile2.col}"]`);
        
        const deltaX = (tile2.col - tile1.col) * 54;
        const deltaY = (tile2.row - tile1.row) * 54;
        
        element1.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        element2.style.transform = `translate(${-deltaX}px, ${-deltaY}px)`;
        element1.style.zIndex = '10';
        element2.style.zIndex = '10';
        
        await new Promise(resolve => setTimeout(resolve, 300));
        
        element1.style.transform = '';
        element2.style.transform = '';
        element1.style.zIndex = '';
        element2.style.zIndex = '';
    }
    
    findMatches() {
        const matches = [];
        
        // Check horizontal matches
        for (let row = 0; row < this.boardSize; row++) {
            let count = 1;
            let currentFish = this.board[row][0].emoji;
            
            for (let col = 1; col < this.boardSize; col++) {
                if (this.board[row][col].emoji === currentFish) {
                    count++;
                } else {
                    if (count >= 3) {
                        for (let i = col - count; i < col; i++) {
                            matches.push({ row, col: i });
                        }
                    }
                    count = 1;
                    currentFish = this.board[row][col].emoji;
                }
            }
            
            if (count >= 3) {
                for (let i = this.boardSize - count; i < this.boardSize; i++) {
                    matches.push({ row, col: i });
                }
            }
        }
        
        // Check vertical matches
        for (let col = 0; col < this.boardSize; col++) {
            let count = 1;
            let currentFish = this.board[0][col].emoji;
            
            for (let row = 1; row < this.boardSize; row++) {
                if (this.board[row][col].emoji === currentFish) {
                    count++;
                } else {
                    if (count >= 3) {
                        for (let i = row - count; i < row; i++) {
                            matches.push({ row: i, col });
                        }
                    }
                    count = 1;
                    currentFish = this.board[row][col].emoji;
                }
            }
            
            if (count >= 3) {
                for (let i = this.boardSize - count; i < this.boardSize; i++) {
                    matches.push({ row: i, col });
                }
            }
        }
        
        // Remove duplicates
        return matches.filter((match, index, self) => 
            index === self.findIndex(m => m.row === match.row && m.col === match.col)
        );
    }
    
    async processMatches() {
        let totalMatches = 0;
        let combo = 0;
        let fishFactShown = false;
        
        while (true) {
            const matches = this.findMatches();
            if (matches.length === 0) break;
            
            totalMatches += matches.length;
            combo++;
            
            // Show fish fact for large matches (5+ tiles)
            if (matches.length >= 5 && !fishFactShown && Math.random() < 0.7) {
                const matchedFish = this.board[matches[0].row][matches[0].col];
                this.showFishFact(matchedFish);
                fishFactShown = true;
            }
            
            // Animate matches
            await this.animateMatches(matches);
            
            // Calculate score
            const baseScore = matches.length * 50;
            const comboBonus = combo > 1 ? (combo - 1) * 25 : 0;
            const levelBonus = this.currentLevel * 10;
            this.score += baseScore + comboBonus + levelBonus;
            
            // Create particles
            matches.forEach(match => {
                const tile = document.querySelector(`[data-row="${match.row}"][data-col="${match.col}"]`);
                if (tile) {
                    const rect = tile.getBoundingClientRect();
                    const color = getComputedStyle(tile).backgroundColor;
                    createParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, color);
                }
            });
            
            playSound(400 + combo * 100, 200, 'sine');
            
            await this.dropTiles();
            await this.fillGaps();
        }
        
        this.updateUI();
    }
    
    async animateMatches(matches) {
        matches.forEach(match => {
            const tile = document.querySelector(`[data-row="${match.row}"][data-col="${match.col}"]`);
            if (tile) {
                tile.classList.add('matching');
            }
        });
        
        await new Promise(resolve => setTimeout(resolve, 600));
    }
    
    async dropTiles() {
        for (let col = 0; col < this.boardSize; col++) {
            const colTiles = [];
            
            for (let row = this.boardSize - 1; row >= 0; row--) {
                if (this.board[row][col]) {
                    colTiles.push(this.board[row][col]);
                }
            }
            
            for (let row = 0; row < this.boardSize; row++) {
                this.board[row][col] = null;
            }
            
            for (let i = 0; i < colTiles.length; i++) {
                this.board[this.boardSize - 1 - i][col] = colTiles[i];
            }
        }
        
        this.renderBoard();
        await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    async fillGaps() {
        for (let col = 0; col < this.boardSize; col++) {
            for (let row = 0; row < this.boardSize; row++) {
                if (!this.board[row][col]) {
                    this.board[row][col] = getRandomFish(this.currentLevel);
                }
            }
        }
        
        const newTiles = document.querySelectorAll('.tile');
        newTiles.forEach(tile => {
            if (!tile.textContent) {
                tile.classList.add('falling');
            }
        });
        
        this.renderBoard();
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    async removeInitialMatches() {
        while (this.findMatches().length > 0) {
            await this.processMatches();
        }
    }
    
    updateUI() {
        animateScore(this.scoreElement, this.score);
        this.movesElement.textContent = this.moves;
        updateProgressBar(this.score, this.target);
    }
    
    checkLevelStatus() {
        if (this.score >= this.target && !this.levelComplete) {
            this.levelComplete = true;
            this.completeLevel();
        } else if (this.moves <= 0 && this.score < this.target) {
            this.gameOver = true;
            this.showGameOver();
        } else if (this.moves <= 0 || this.findPossibleMoves().length === 0) {
            this.gameOver = true;
            this.showGameOver();
        }
    }
    
    completeLevel() {
        this.totalScore += this.score;
        saveProgress(this.currentLevel + 1, this.totalScore);
        
        // Show bonus fish fact
        const bonusFact = getBonusFishFact(this.currentLevel);
        setTimeout(() => {
            this.showFishFact(bonusFact, true);
        }, 1000);
        
        setTimeout(() => {
            this.showLevelComplete();
        }, 2000);
        
        playSound(600, 1000, 'sine');
    }
    
    showFishFact(fish, isBonus = false) {
        document.getElementById('fishIcon').textContent = fish.emoji;
        document.getElementById('fishName').textContent = fish.name;
        document.getElementById('fishFact').textContent = fish.fact;
        
        if (isBonus) {
            document.getElementById('fishName').textContent = `🎉 ${fish.name} 🎉`;
        }
        
        this.fishFactModal.classList.add('show');
    }
    
    hideFishFact() {
        this.fishFactModal.classList.remove('show');
    }
    
    showLevelComplete() {
        const stars = calculateStars(this.score, this.target);
        const starsContainer = document.getElementById('starsContainer');
        const starElements = starsContainer.querySelectorAll('.star');
        
        starElements.forEach((star, index) => {
            if (index < stars) {
                star.style.opacity = '1';
                star.style.color = '#fbbf24';
            } else {
                star.style.opacity = '0.3';
                star.style.color = '#9ca3af';
            }
        });
        
        document.getElementById('levelScore').textContent = this.score;
        
        if (this.currentLevel >= 10) {
            // Game complete
            setTimeout(() => {
                this.levelCompleteModal.classList.remove('show');
                this.showGameComplete();
            }, 3000);
        }
        
        this.levelCompleteModal.classList.add('show');
    }
    
    showGameComplete() {
        document.getElementById('totalScore').textContent = this.totalScore;
        this.gameCompleteModal.classList.add('show');
    }
    
    showGameOver() {
        document.getElementById('finalScore').textContent = this.totalScore;
        this.gameOverModal.classList.add('show');
        playSound(300, 1000, 'square');
    }
    
    nextLevel() {
        this.levelCompleteModal.classList.remove('show');
        
        if (this.currentLevel >= 10) {
            this.showGameComplete();
            return;
        }
        
        this.currentLevel++;
        this.loadLevel(this.currentLevel);
        this.generateBoard();
        this.renderBoard();
        this.removeInitialMatches();
        this.updateUI();
    }
    
    restartLevel() {
        this.loadLevel(this.currentLevel);
        this.generateBoard();
        this.renderBoard();
        this.removeInitialMatches();
        this.updateUI();
        this.clearSelection();
    }
    
    restartGame() {
        this.gameOverModal.classList.remove('show');
        this.gameCompleteModal.classList.remove('show');
        this.levelCompleteModal.classList.remove('show');
        
        this.currentLevel = 1;
        this.totalScore = 0;
        saveProgress(1, 0);
        
        this.loadLevel(1);
        this.generateBoard();
        this.renderBoard();
        this.removeInitialMatches();
        this.updateUI();
        this.clearSelection();
    }
    
    findPossibleMoves() {
        const possibleMoves = [];
        
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                if (col < this.boardSize - 1) {
                    this.simulateSwap(row, col, row, col + 1, possibleMoves);
                }
                
                if (row < this.boardSize - 1) {
                    this.simulateSwap(row, col, row + 1, col, possibleMoves);
                }
            }
        }
        
        return possibleMoves;
    }
    
    simulateSwap(row1, col1, row2, col2, possibleMoves) {
        const temp = this.board[row1][col1];
        this.board[row1][col1] = this.board[row2][col2];
        this.board[row2][col2] = temp;
        
        if (this.findMatches().length > 0) {
            possibleMoves.push({ row1, col1, row2, col2 });
        }
        
        this.board[row2][col2] = this.board[row1][col1];
        this.board[row1][col1] = temp;
    }
    
    showHint() {
        const possibleMoves = this.findPossibleMoves();
        if (possibleMoves.length > 0) {
            const hint = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
            const tile1 = document.querySelector(`[data-row="${hint.row1}"][data-col="${hint.col1}"]`);
            const tile2 = document.querySelector(`[data-row="${hint.row2}"][data-col="${hint.col2}"]`);
            
            [tile1, tile2].forEach(tile => {
                tile.style.animation = 'hintPulse 1s ease-in-out 3';
            });
            
            setTimeout(() => {
                [tile1, tile2].forEach(tile => {
                    tile.style.animation = '';
                });
            }, 3000);
        }
    }
    
    // Touch handling for mobile
    handleTouchStart(event) {
        event.preventDefault();
        this.touchStartPos = getTilePosition(event, this.gameBoard);
    }
    
    handleTouchMove(event) {
        event.preventDefault();
    }
    
    handleTouchEnd(event) {
        event.preventDefault();
        if (!this.touchStartPos) return;
        
        const endPos = getTilePosition(event.changedTouches[0], this.gameBoard);
        
        if (this.touchStartPos.row === endPos.row && this.touchStartPos.col === endPos.col) {
            const tile = document.querySelector(`[data-row="${endPos.row}"][data-col="${endPos.col}"]`);
            if (tile) {
                this.handleTileClick({ target: tile });
            }
        } else if (this.isAdjacent(this.touchStartPos, endPos)) {
            if (this.selectedTile) {
                this.clearSelection();
            }
            this.swapTiles(this.touchStartPos, endPos);
        }
        
        this.touchStartPos = null;
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FishFactsCandyCrush();
});
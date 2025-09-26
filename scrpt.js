// Game Constants
const FISH_EMOJIS = ["🐠", "🐡", "🐙", "🦈", "🐟", "🦀"];
const BOMB_EMOJI = "💣";
const BOARD_SIZE = 8;

const LEVELS = [
    { level: 1, targetScore: 1200, moves: 25, fishTypes: 4, complexity: "medium", bombChance: 0.15 },
    { level: 2, targetScore: 2000, moves: 22, fishTypes: 5, complexity: "medium", bombChance: 0.18 },
    { level: 3, targetScore: 3500, moves: 20, fishTypes: 5, complexity: "hard", bombChance: 0.20 },
    { level: 4, targetScore: 4800, moves: 18, fishTypes: 5, complexity: "medium", bombChance: 0.12 },
    { level: 5, targetScore: 6500, moves: 16, fishTypes: 5, complexity: "medium", bombChance: 0.10 },
    { level: 6, targetScore: 8500, moves: 15, fishTypes: 6, complexity: "hard", bombChance: 0.08 },
    { level: 7, targetScore: 11000, moves: 14, fishTypes: 6, complexity: "hard", bombChance: 0.08 },
    { level: 8, targetScore: 14000, moves: 13, fishTypes: 6, complexity: "hard", bombChance: 0.06 },
    { level: 9, targetScore: 18000, moves: 12, fishTypes: 6, complexity: "expert", bombChance: 0.05 },
    { level: 10, targetScore: 25000, moves: 10, fishTypes: 6, complexity: "expert", bombChance: 0.05 }
];

const SEA_FACTS = [
    "🐋 The blue whale's heart alone weighs as much as an automobile and its tongue can weigh as much as an elephant!",
    "🐙 Octopuses have three hearts, blue blood, and can change both color and texture in 0.3 seconds to perfectly camouflage!",
    "🦄 Seahorses are the only species where males get pregnant, and they can move their eyes independently like chameleons!",
    "🎐 A group of jellyfish is called a 'smack' and they've survived for over 500 million years without brains or hearts!",
    "🐬 Dolphins have unique names (signature whistles) and can recognize themselves in mirrors, showing self-awareness!",
    "🌈 The mantis shrimp can see 16 types of color receptors (humans have 3) and punch with the force of a bullet!",
    "🦈 Sharks have been around for 400+ million years and can detect a drop of blood in 25 gallons of water!",
    "🤝 Sea otters hold hands while sleeping and use tools like rocks to crack open shellfish - true ocean engineers!",
    "💡 Deep-sea anglerfish create their own light through bioluminescence and males permanently fuse to females when mating!",
    "🏙️ Coral reefs are like underwater cities, supporting 25% of marine life while covering less than 1% of ocean floor!"
];

// Game State
let gameState = {
    board: [],
    score: 0,
    moves: 0,
    currentLevel: 1,
    selectedFish: null,
    isAnimating: false,
    gameMode: "menu", // menu, playing, levelComplete, gameOver, gameComplete
    bombsExploded: 0
};

// DOM Elements
const screens = {
    menu: document.getElementById('menuScreen'),
    game: document.getElementById('gameScreen'),
    levelComplete: document.getElementById('levelCompleteScreen'),
    gameOver: document.getElementById('gameOverScreen'),
    gameComplete: document.getElementById('gameCompleteScreen')
};

const elements = {
    startButton: document.getElementById('startButton'),
    gameBoard: document.getElementById('gameBoard'),
    levelNumber: document.getElementById('levelNumber'),
    complexityIndicator: document.getElementById('complexityIndicator'),
    currentScore: document.getElementById('currentScore'),
    targetScore: document.getElementById('targetScore'),
    movesLeft: document.getElementById('movesLeft'),
    progressText: document.getElementById('progressText'),
    progressFill: document.getElementById('progressFill'),
    menuButton: document.getElementById('menuButton'),
    restartButton: document.getElementById('restartButton'),
    finalScore: document.getElementById('finalScore'),
    seaFactText: document.getElementById('seaFactText'),
    nextLevelButton: document.getElementById('nextLevelButton'),
    replayButton: document.getElementById('replayButton'),
    gameOverScore: document.getElementById('gameOverScore'),
    tryAgainButton: document.getElementById('tryAgainButton'),
    mainMenuButton: document.getElementById('mainMenuButton'),
    totalScore: document.getElementById('totalScore'),
    playAgainButton: document.getElementById('playAgainButton'),
    bubblesContainer: document.getElementById('bubblesContainer')
};

// Initialize Game
function init() {
    setupEventListeners();
    showScreen('menu');
}

// Event Listeners
function setupEventListeners() {
    elements.startButton.addEventListener('click', startGame);
    elements.menuButton.addEventListener('click', () => showScreen('menu'));
    elements.restartButton.addEventListener('click', restartLevel);
    elements.nextLevelButton.addEventListener('click', nextLevel);
    elements.replayButton.addEventListener('click', restartLevel);
    elements.tryAgainButton.addEventListener('click', restartLevel);
    elements.mainMenuButton.addEventListener('click', () => showScreen('menu'));
    elements.playAgainButton.addEventListener('click', () => {
        gameState.currentLevel = 1;
        gameState.score = 0;
        showScreen('menu');
    });
}

// Screen Management
function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    screens[screenName].classList.add('active');
    gameState.gameMode = screenName;
    
    // Update background based on level
    if (screenName === 'game') {
        document.body.className = `level-bg-${gameState.currentLevel}`;
    } else {
        document.body.className = '';
    }
}

// Game Logic
function startGame() {
    const levelData = LEVELS[gameState.currentLevel - 1];
    gameState.board = createBoard();
    gameState.score = 0;
    gameState.moves = levelData.moves;
    gameState.selectedFish = null;
    gameState.isAnimating = false;
    gameState.bombsExploded = 0;
    
    updateUI();
    renderBoard();
    showScreen('game');
}

function createBoard() {
    const board = [];
    const levelData = LEVELS[gameState.currentLevel - 1];
    
    for (let row = 0; row < BOARD_SIZE; row++) {
        board[row] = [];
        for (let col = 0; col < BOARD_SIZE; col++) {
            let fish = createRandomFish(row, col);
            
            // Prevent initial matches
            let attempts = 0;
            while (attempts < 10) {
                const hasHorizontalMatch = col >= 2 && 
                    board[row][col - 1]?.type === fish.type && 
                    board[row][col - 2]?.type === fish.type &&
                    !fish.isBomb && !board[row][col - 1]?.isBomb && !board[row][col - 2]?.isBomb;
                
                const hasVerticalMatch = row >= 2 && 
                    board[row - 1]?.[col]?.type === fish.type && 
                    board[row - 2]?.[col]?.type === fish.type &&
                    !fish.isBomb && !board[row - 1]?.[col]?.isBomb && !board[row - 2]?.[col]?.isBomb;

                if (!hasHorizontalMatch && !hasVerticalMatch) {
                    break;
                }
                
                fish = createRandomFish(row, col);
                attempts++;
            }
            
            board[row][col] = fish;
        }
    }
    return board;
}

function createRandomFish(row, col) {
    const levelData = LEVELS[gameState.currentLevel - 1];
    const isBomb = Math.random() < (levelData.bombChance || 0);
    
    return {
        id: `${row}-${col}-${Date.now()}-${Math.random()}`,
        type: isBomb ? -1 : Math.floor(Math.random() * levelData.fishTypes),
        row,
        col,
        isMatched: false,
        isSelected: false,
        isBomb: isBomb
    };
}

function renderBoard() {
    elements.gameBoard.innerHTML = '';
    
    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            const fish = gameState.board[row][col];
            const cell = document.createElement('div');
            
            if (fish.isBomb) {
                cell.className = `fish-cell bomb-cell`;
                cell.textContent = BOMB_EMOJI;
            } else {
                cell.className = `fish-cell fish-type-${fish.type}`;
                cell.textContent = FISH_EMOJIS[fish.type];
            }
            
            cell.dataset.row = row;
            cell.dataset.col = col;
            
            if (fish.isSelected) {
                cell.classList.add('selected');
            }
            
            if (fish.isMatched) {
                cell.classList.add('matched');
            }
            
            cell.addEventListener('click', () => handleFishClick(row, col));
            elements.gameBoard.appendChild(cell);
        }
    }
}

function handleFishClick(row, col) {
    if (gameState.isAnimating || gameState.gameMode !== 'game') return;

    if (!gameState.selectedFish) {
        // Select fish
        gameState.selectedFish = { row, col };
        gameState.board[row][col].isSelected = true;
        renderBoard();
    } else {
        const selected = gameState.selectedFish;
        
        if (selected.row === row && selected.col === col) {
            // Deselect same fish
            gameState.selectedFish = null;
            gameState.board[row][col].isSelected = false;
            renderBoard();
            return;
        }

        if (isValidMove(selected.row, selected.col, row, col)) {
            // Valid move - swap fish
            swapFish(selected.row, selected.col, row, col);
            const hasMatches = checkForMatches();
            
            if (hasMatches) {
                gameState.moves--;
                processMatches();
            } else {
                // Invalid move - swap back
                setTimeout(() => {
                    swapFish(selected.row, selected.col, row, col);
                    clearSelection();
                    renderBoard();
                }, 200);
            }
        }
        
        clearSelection();
    }
}

function clearSelection() {
    gameState.selectedFish = null;
    gameState.board.forEach(row => {
        row.forEach(fish => {
            fish.isSelected = false;
        });
    });
}

function isValidMove(row1, col1, row2, col2) {
    const rowDiff = Math.abs(row1 - row2);
    const colDiff = Math.abs(col1 - col2);
    return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
}

function swapFish(row1, col1, row2, col2) {
    const temp = gameState.board[row1][col1];
    gameState.board[row1][col1] = gameState.board[row2][col2];
    gameState.board[row2][col2] = temp;
    
    // Update positions
    gameState.board[row1][col1].row = row1;
    gameState.board[row1][col1].col = col1;
    gameState.board[row2][col2].row = row2;
    gameState.board[row2][col2].col = col2;
}

function checkForMatches() {
    let hasMatches = false;
    
    // Reset match flags
    gameState.board.forEach(row => {
        row.forEach(fish => {
            fish.isMatched = false;
        });
    });

    // Check horizontal matches
    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE - 2; col++) {
            const fish1 = gameState.board[row][col];
            const fish2 = gameState.board[row][col + 1];
            const fish3 = gameState.board[row][col + 2];

            if (!fish1.isBomb && !fish2.isBomb && !fish3.isBomb && 
                fish1.type === fish2.type && fish2.type === fish3.type) {
                fish1.isMatched = true;
                fish2.isMatched = true;
                fish3.isMatched = true;
                hasMatches = true;

                // Check for longer matches
                let extraCol = col + 3;
                while (extraCol < BOARD_SIZE && 
                       !gameState.board[row][extraCol].isBomb &&
                       gameState.board[row][extraCol].type === fish1.type) {
                    gameState.board[row][extraCol].isMatched = true;
                    extraCol++;
                }
            }
        }
    }

    // Check vertical matches
    for (let col = 0; col < BOARD_SIZE; col++) {
        for (let row = 0; row < BOARD_SIZE - 2; row++) {
            const fish1 = gameState.board[row][col];
            const fish2 = gameState.board[row + 1][col];
            const fish3 = gameState.board[row + 2][col];

            if (!fish1.isBomb && !fish2.isBomb && !fish3.isBomb &&
                fish1.type === fish2.type && fish2.type === fish3.type) {
                fish1.isMatched = true;
                fish2.isMatched = true;
                fish3.isMatched = true;
                hasMatches = true;

                // Check for longer matches
                let extraRow = row + 3;
                while (extraRow < BOARD_SIZE && 
                       !gameState.board[extraRow][col].isBomb &&
                       gameState.board[extraRow][col].type === fish1.type) {
                    gameState.board[extraRow][col].isMatched = true;
                    extraRow++;
                }
            }
        }
    }

    return hasMatches;
}

function explodeBomb(row, col) {
    const explosionRadius = 1;
    let explodedCount = 0;
    
    // Mark bomb and surrounding cells for explosion
    for (let r = Math.max(0, row - explosionRadius); r <= Math.min(BOARD_SIZE - 1, row + explosionRadius); r++) {
        for (let c = Math.max(0, col - explosionRadius); c <= Math.min(BOARD_SIZE - 1, col + explosionRadius); c++) {
            if (gameState.board[r] && gameState.board[r][c]) {
                gameState.board[r][c].isMatched = true;
                explodedCount++;
                
                // Chain reaction: if we hit another bomb, mark it for explosion too
                if (gameState.board[r][c].isBomb && (r !== row || c !== col)) {
                    setTimeout(() => explodeBomb(r, c), 100);
                }
            }
        }
    }
    
    gameState.bombsExploded++;
    createExplosionEffect(row, col);
    return explodedCount;
}

function createExplosionEffect(row, col) {
    // Create dramatic explosion bubbles
    createBubbles(15);
    
    // Add screen shake effect
    document.body.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 500);
}

async function processMatches() {
    gameState.isAnimating = true;
    let totalMatches = 0;
    let bombsTriggered = false;

    while (true) {
        const hasMatches = checkForMatches();
        
        // Check for bombs in matched areas or adjacent to matches
        for (let row = 0; row < BOARD_SIZE; row++) {
            for (let col = 0; col < BOARD_SIZE; col++) {
                const fish = gameState.board[row][col];
                if (fish.isBomb && (fish.isMatched || isAdjacentToMatch(row, col))) {
                    explodeBomb(row, col);
                    bombsTriggered = true;
                }
            }
        }
        
        if (!hasMatches && !bombsTriggered) break;

        renderBoard();
        await sleep(bombsTriggered ? 600 : 300);

        const matchCount = removeMatches();
        totalMatches += matchCount;
        
        dropFish();
        fillEmptySpaces();
        
        renderBoard();
        await sleep(200);
        
        bombsTriggered = false;
    }

    if (totalMatches > 0) {
        let points = totalMatches * 100;
        
        // Bonus points for bomb explosions
        if (gameState.bombsExploded > 0) {
            points += gameState.bombsExploded * 500;
            gameState.bombsExploded = 0;
        }
        
        gameState.score += points;
        
        // Create bubbles on successful match
        createBubbles(Math.min(totalMatches, 12));
        
        // Animate score
        elements.currentScore.classList.add('score-animation');
        setTimeout(() => {
            elements.currentScore.classList.remove('score-animation');
        }, 500);
    }

    gameState.isAnimating = false;
    updateUI();
    checkGameEnd();
}

function isAdjacentToMatch(row, col) {
    const directions = [[-1,0], [1,0], [0,-1], [0,1]];
    
    for (let [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;
        
        if (newRow >= 0 && newRow < BOARD_SIZE && newCol >= 0 && newCol < BOARD_SIZE) {
            if (gameState.board[newRow][newCol].isMatched) {
                return true;
            }
        }
    }
    return false;
}

function removeMatches() {
    let matchCount = 0;
    
    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            if (gameState.board[row][col].isMatched) {
                matchCount++;
                gameState.board[row][col] = null;
            }
        }
    }
    
    return matchCount;
}

function dropFish() {
    for (let col = 0; col < BOARD_SIZE; col++) {
        const column = [];
        
        // Collect non-null fish from bottom to top
        for (let row = BOARD_SIZE - 1; row >= 0; row--) {
            if (gameState.board[row][col] !== null) {
                column.push(gameState.board[row][col]);
            }
        }
        
        // Clear column
        for (let row = 0; row < BOARD_SIZE; row++) {
            gameState.board[row][col] = null;
        }
        
        // Place fish back from bottom
        for (let i = 0; i < column.length; i++) {
            const row = BOARD_SIZE - 1 - i;
            gameState.board[row][col] = column[i];
            gameState.board[row][col].row = row;
            gameState.board[row][col].col = col;
        }
    }
}

function fillEmptySpaces() {
    for (let col = 0; col < BOARD_SIZE; col++) {
        for (let row = 0; row < BOARD_SIZE; row++) {
            if (gameState.board[row][col] === null) {
                gameState.board[row][col] = createRandomFish(row, col);
            }
        }
    }
}

function createBubbles(count) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            bubble.style.left = Math.random() * 100 + '%';
            bubble.style.top = '100%';
            bubble.style.width = (Math.random() * 25 + 15) + 'px';
            bubble.style.height = bubble.style.width;
            bubble.style.background = `radial-gradient(circle at 30% 30%, 
                rgba(${Math.random() * 255}, ${Math.random() * 255}, 255, 0.8), 
                rgba(255, 255, 255, 0.3))`;
            
            elements.bubblesContainer.appendChild(bubble);
            
            // Remove bubble after animation
            setTimeout(() => {
                if (bubble.parentNode) {
                    bubble.parentNode.removeChild(bubble);
                }
            }, 4000);
        }, i * 50);
    }
}

function updateUI() {
    const levelData = LEVELS[gameState.currentLevel - 1];
    
    elements.levelNumber.textContent = `Level ${gameState.currentLevel}`;
    elements.currentScore.textContent = `Score: ${gameState.score.toLocaleString()}`;
    elements.targetScore.textContent = `Target: ${levelData.targetScore.toLocaleString()}`;
    elements.movesLeft.textContent = `Moves: ${gameState.moves}`;
    
    const progress = Math.min(100, (gameState.score / levelData.targetScore) * 100);
    elements.progressText.textContent = `Progress: ${progress.toFixed(0)}%`;
    elements.progressFill.style.width = progress + '%';
    
    updateComplexityIndicator(levelData.complexity);
}

function updateComplexityIndicator(complexity) {
    const dots = {
        easy: 1,
        medium: 2,
        hard: 3,
        expert: 4
    };
    
    elements.complexityIndicator.innerHTML = '';
    
    for (let i = 0; i < 4; i++) {
        const dot = document.createElement('div');
        dot.className = 'complexity-dot';
        
        if (i < dots[complexity]) {
            dot.classList.add(`complexity-${complexity}`);
        } else {
            dot.style.background = '#ccc';
        }
        
        elements.complexityIndicator.appendChild(dot);
    }
}

function checkGameEnd() {
    const levelData = LEVELS[gameState.currentLevel - 1];
    
    if (gameState.score >= levelData.targetScore) {
        // Level complete
        elements.finalScore.textContent = `Score: ${gameState.score.toLocaleString()}`;
        
        const randomFact = SEA_FACTS[Math.floor(Math.random() * SEA_FACTS.length)];
        elements.seaFactText.textContent = randomFact;
        
        if (gameState.currentLevel < 10) {
            elements.nextLevelButton.textContent = `Next Level (${gameState.currentLevel + 1})`;
            elements.nextLevelButton.style.display = 'block';
        } else {
            elements.nextLevelButton.style.display = 'none';
            setTimeout(() => {
                elements.totalScore.textContent = `Total Score: ${gameState.score.toLocaleString()}`;
                showScreen('gameComplete');
            }, 2000);
            return;
        }
        
        showScreen('levelComplete');
    } else if (gameState.moves <= 0) {
        // Game over
        elements.gameOverScore.textContent = `Final Score: ${gameState.score.toLocaleString()}`;
        showScreen('gameOver');
    }
}

function nextLevel() {
    if (gameState.currentLevel < 10) {
        gameState.currentLevel++;
        startGame();
    }
}

function restartLevel() {
    startGame();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', init);
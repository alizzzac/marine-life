// Game Data
const levels = [
    {
        name: "Coral Garden",
        gridSize: 4,
        difficulty: "easy",
        imageUrl: "jmp.jpg",
        seaFact: "Coral reefs are home to 25% of all marine species, despite covering less than 1% of the ocean floor. They're often called the 'rainforests of the sea' due to their incredible biodiversity!"
    },
    {
        name: "Sea Turtle Haven",
        gridSize: 3,
        difficulty: "easy",
        imageUrl: "haver.jpg",
        seaFact: "Sea turtles can live over 100 years and use Earth's magnetic field to navigate across entire ocean basins, returning to the exact beach where they were born to lay their eggs!"
    },
    {
        name: "Jellyfish Ballet",
        gridSize: 3,
        difficulty: "easy",
        imageUrl: "https://images.pexels.com/photos/1076758/pexels-photo-1076758.jpeg?auto=compress&cs=tinysrgb&w=300&h=300",
        seaFact: "Jellyfish have been drifting through the oceans for over 500 million years, making them older than dinosaurs! They're 95% water and have no brain, heart, or blood."
    },
    {
        name: "Tropical Paradise",
        gridSize: 4,
        difficulty: "medium",
        imageUrl: "beach-1836335_1280.JPG",
        seaFact: "The Great Barrier Reef is so large it can be seen from space! It stretches over 2,300 kilometers and is made up of over 2,900 individual coral reefs."
    },
    {
        name: "Deep Sea Mystery",
        gridSize: 4,
        difficulty: "medium",
        imageUrl: "mnmo.jpg",
        seaFact: "The ocean's deepest point is the Mariana Trench at 11,034 meters deep. If Mount Everest were placed there, its peak would still be over 2 kilometers underwater!"
    },
    {
        name: "Whale Migration",
        gridSize: 4,
        difficulty: "medium",
        imageUrl: "https://images.pexels.com/photos/892548/pexels-photo-892548.jpeg?auto=compress&cs=tinysrgb&w=400&h=400",
        seaFact: "Blue whales are the largest animals ever known to have lived on Earth. Their hearts alone can weigh as much as a car, and their tongues can weigh as much as an elephant!"
    },
    {
        name: "Arctic Waters",
        gridSize: 4,
        difficulty: "medium",
        imageUrl: "mlop.jpg",
        seaFact: "Arctic waters are home to narwhals, the 'unicorns of the sea.' Their tusks are actually elongated teeth that can grow up to 3 meters long and contain millions of nerve endings!"
    },
    {
        name: "Kelp Forest",
        gridSize: 5,
        difficulty: "hard",
        imageUrl: "KK.jpg",
        seaFact: "Giant kelp can grow up to 60 centimeters per day, making it one of the fastest-growing organisms on Earth. These underwater forests provide habitat for thousands of marine species!"
    },
    {
        name: "Bioluminescent Bay",
        gridSize: 5,
        difficulty: "hard",
        imageUrl: "download.jpg",
        seaFact: "Some marine organisms create their own light through bioluminescence. Over 80% of deep-sea creatures produce their own light to communicate, hunt, or defend themselves!"
    },
    {
        name: "Abyssal Plain",
        gridSize: 5,
        difficulty: "hard",
        imageUrl: "loml.jpg",
        seaFact: "The ocean produces over 50% of the world's oxygen and absorbs 30% of carbon dioxide produced by humans. It literally helps us breathe and regulates our planet's climate!"
    }
];

// Game State
class GameState {
    constructor() {
        this.currentLevel = null;
        this.completedLevels = JSON.parse(localStorage.getItem('oceanQuestCompleted') || '[]');
        this.currentScreen = 'levelSelect';
        this.puzzle = null;
        this.moves = 0;
        this.startTime = null;
        this.gameTimer = null;
    }

    saveProgress() {
        localStorage.setItem('oceanQuestCompleted', JSON.stringify(this.completedLevels));
    }

    completeLevel(levelIndex) {
        if (!this.completedLevels.includes(levelIndex)) {
            this.completedLevels.push(levelIndex);
            this.saveProgress();
        }
    }

    isLevelUnlocked(levelIndex) {
        return levelIndex === 0 || this.completedLevels.includes(levelIndex - 1);
    }
}

// Puzzle Logic
class SlidingPuzzle {
    constructor(gridSize, imageUrl) {
        this.gridSize = gridSize;
        this.imageUrl = imageUrl;
        this.tiles = [];
        this.emptyIndex = gridSize * gridSize - 1;
        this.initialize();
    }

    initialize() {
        // Create ordered tiles
        for (let i = 0; i < this.gridSize * this.gridSize; i++) {
            this.tiles[i] = i;
        }
        this.shuffle();
    }

    shuffle() {
        // Perform valid moves to shuffle
        for (let i = 0; i < 1000; i++) {
            const possibleMoves = this.getPossibleMoves();
            const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
            this.moveTile(randomMove, false);
        }
    }

    getPossibleMoves() {
        const moves = [];
        const row = Math.floor(this.emptyIndex / this.gridSize);
        const col = this.emptyIndex % this.gridSize;

        if (row > 0) moves.push(this.emptyIndex - this.gridSize); // Up
        if (row < this.gridSize - 1) moves.push(this.emptyIndex + this.gridSize); // Down
        if (col > 0) moves.push(this.emptyIndex - 1); // Left
        if (col < this.gridSize - 1) moves.push(this.emptyIndex + 1); // Right

        return moves;
    }

    moveTile(tileIndex, countMove = true) {
        const possibleMoves = this.getPossibleMoves();
        
        if (possibleMoves.includes(tileIndex)) {
            // Swap tiles
            [this.tiles[this.emptyIndex], this.tiles[tileIndex]] = 
            [this.tiles[tileIndex], this.tiles[this.emptyIndex]];
            
            this.emptyIndex = tileIndex;
            
            if (countMove) {
                gameState.moves++;
                updateMoveCounter();
            }
            
            return true;
        }
        return false;
    }

    isSolved() {
        return this.tiles.every((tile, index) => tile === index);
    }

    getTilePosition(tileNumber) {
        const row = Math.floor(tileNumber / this.gridSize);
        const col = tileNumber % this.gridSize;
        return { row, col };
    }
}

// Game State Instance
const gameState = new GameState();

// DOM Elements
const screens = {
    levelSelect: document.getElementById('levelSelect'),
    gameBoard: document.getElementById('gameBoard')
};

const elements = {
    levelsGrid: document.getElementById('levelsGrid'),
    progressFill: document.getElementById('progressFill'),
    progressText: document.getElementById('progressText'),
    backBtn: document.getElementById('backBtn'),
    resetBtn: document.getElementById('resetBtn'),
    levelName: document.getElementById('levelName'),
    moveCounter: document.getElementById('moveCounter'),
    timeCounter: document.getElementById('timeCounter'),
    puzzleGrid: document.getElementById('puzzleGrid'),
    previewImage: document.getElementById('previewImage'),
    seaFactModal: document.getElementById('seaFactModal'),
    seaFactText: document.getElementById('seaFactText'),
    closeModal: document.getElementById('closeModal'),
    continueBtn: document.getElementById('continueBtn'),
    victoryModal: document.getElementById('victoryModal'),
    finalMoves: document.getElementById('finalMoves'),
    finalTime: document.getElementById('finalTime'),
    starRating: document.getElementById('starRating'),
    loadingScreen: document.getElementById('loadingScreen')
};

// Utility Functions
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    screens[screenName].classList.add('active');
    gameState.currentScreen = screenName;
}

function showModal(modalElement) {
    modalElement.classList.add('active');
}

function hideModal(modalElement) {
    modalElement.classList.remove('active');
}

// Level Selection Functions
function renderLevels() {
    elements.levelsGrid.innerHTML = '';
    
    levels.forEach((level, index) => {
        const isUnlocked = gameState.isLevelUnlocked(index);
        const isCompleted = gameState.completedLevels.includes(index);
        
        const levelCard = document.createElement('div');
        levelCard.className = `level-card ${!isUnlocked ? 'locked' : ''} ${isCompleted ? 'completed' : ''}`;
        
        levelCard.innerHTML = `
            <img src="${level.imageUrl}" alt="${level.name}" class="level-image">
            <div class="level-info">
                <h3>${level.name}</h3>
                <div class="level-meta">
                    <span>${level.gridSize}×${level.gridSize} puzzle</span>
                    <span class="difficulty ${level.difficulty}">${level.difficulty.toUpperCase()}</span>
                </div>
            </div>
            ${!isUnlocked ? '<i class="fas fa-lock lock-icon"></i>' : ''}
        `;
        
        if (isUnlocked) {
            levelCard.addEventListener('click', () => startLevel(index));
        }
        
        elements.levelsGrid.appendChild(levelCard);
    });
    
    updateProgressBar();
}

function updateProgressBar() {
    const completedCount = gameState.completedLevels.length;
    const totalLevels = levels.length;
    const percentage = (completedCount / totalLevels) * 100;
    
    elements.progressFill.style.width = `${percentage}%`;
    elements.progressText.textContent = `${completedCount}/${totalLevels} Levels Completed`;
}

// Game Functions
function startLevel(levelIndex) {
    gameState.currentLevel = levelIndex;
    const level = levels[levelIndex];
    
    // Initialize puzzle
    gameState.puzzle = new SlidingPuzzle(level.gridSize, level.imageUrl);
    gameState.moves = 0;
    gameState.startTime = Date.now();
    
    // Update UI
    elements.levelName.textContent = level.name;
    elements.previewImage.src = level.imageUrl;
    updateMoveCounter();
    
    // Start timer
    startGameTimer();
    
    // Render puzzle
    renderPuzzle();
    
    // Show game screen
    showScreen('gameBoard');
}

function renderPuzzle() {
    const level = levels[gameState.currentLevel];
    const puzzle = gameState.puzzle;
    
    elements.puzzleGrid.innerHTML = '';
    elements.puzzleGrid.style.gridTemplateColumns = `repeat(${level.gridSize}, 1fr)`;
    
    // Calculate tile size based on screen size
    const containerWidth = Math.min(400, window.innerWidth - 40);
    const tileSize = Math.floor(containerWidth / level.gridSize);
    
    puzzle.tiles.forEach((tileNumber, index) => {
        const tile = document.createElement('div');
        tile.className = 'puzzle-tile';
        
        if (tileNumber === level.gridSize * level.gridSize - 1) {
            // Empty tile
            tile.classList.add('empty');
        } else {
            // Regular tile with image
            const img = document.createElement('img');
            img.className = 'tile-image';
            img.src = level.imageUrl;
            
            const position = puzzle.getTilePosition(tileNumber);
            const backgroundX = -position.col * tileSize;
            const backgroundY = -position.row * tileSize;
            
            img.style.objectPosition = `${backgroundX}px ${backgroundY}px`;
            img.style.objectFit = 'none';
            img.style.width = `${level.gridSize * tileSize}px`;
            img.style.height = `${level.gridSize * tileSize}px`;
            
            tile.appendChild(img);
            
            tile.addEventListener('click', () => {
                if (puzzle.moveTile(index)) {
                    renderPuzzle();
                    
                    if (puzzle.isSolved()) {
                        setTimeout(() => {
                            completeLevel();
                        }, 500);
                    }
                }
            });
        }
        
        elements.puzzleGrid.appendChild(tile);
    });
}

function updateMoveCounter() {
    elements.moveCounter.textContent = `Moves: ${gameState.moves}`;
}

function startGameTimer() {
    if (gameState.gameTimer) {
        clearInterval(gameState.gameTimer);
    }
    
    gameState.gameTimer = setInterval(() => {
        const elapsed = Math.floor((Date.now() - gameState.startTime) / 1000);
        elements.timeCounter.textContent = `Time: ${formatTime(elapsed)}`;
    }, 1000);
}

function stopGameTimer() {
    if (gameState.gameTimer) {
        clearInterval(gameState.gameTimer);
        gameState.gameTimer = null;
    }
}

function completeLevel() {
    stopGameTimer();
    
    const levelIndex = gameState.currentLevel;
    const level = levels[levelIndex];
    const finalTime = Math.floor((Date.now() - gameState.startTime) / 1000);
    
    // Update victory modal
    elements.finalMoves.textContent = gameState.moves;
    elements.finalTime.textContent = formatTime(finalTime);
    
    // Calculate stars based on performance
    const stars = calculateStars(gameState.moves, finalTime, level.gridSize);
    renderStars(stars);
    
    // Show victory modal
    showModal(elements.victoryModal);
    
    // Complete level after a delay
    setTimeout(() => {
        gameState.completeLevel(levelIndex);
        hideModal(elements.victoryModal);
        
        // Show sea fact
        elements.seaFactText.textContent = level.seaFact;
        showModal(elements.seaFactModal);
    }, 2000);
}

function calculateStars(moves, time, gridSize) {
    const optimalMoves = gridSize * gridSize * 2;
    const optimalTime = gridSize * 30;
    
    let stars = 1;
    
    if (moves <= optimalMoves && time <= optimalTime) {
        stars = 3;
    } else if (moves <= optimalMoves * 1.5 && time <= optimalTime * 1.5) {
        stars = 2;
    }
    
    return stars;
}

function renderStars(count) {
    elements.starRating.innerHTML = '';
    
    for (let i = 0; i < 3; i++) {
        const star = document.createElement('i');
        star.className = `fas fa-star star ${i < count ? '' : 'empty'}`;
        elements.starRating.appendChild(star);
        
        // Animate stars
        setTimeout(() => {
            star.style.animationDelay = `${i * 0.2}s`;
        }, 100);
    }
}

function resetLevel() {
    if (gameState.currentLevel !== null) {
        startLevel(gameState.currentLevel);
    }
}

function backToLevels() {
    stopGameTimer();
    showScreen('levelSelect');
    renderLevels();
}

// Event Listeners
elements.backBtn.addEventListener('click', backToLevels);
elements.resetBtn.addEventListener('click', resetLevel);

elements.closeModal.addEventListener('click', () => {
    hideModal(elements.seaFactModal);
    backToLevels();
});

elements.continueBtn.addEventListener('click', () => {
    hideModal(elements.seaFactModal);
    backToLevels();
});

// Close modals when clicking outside
elements.seaFactModal.addEventListener('click', (e) => {
    if (e.target === elements.seaFactModal) {
        hideModal(elements.seaFactModal);
        backToLevels();
    }
});

elements.victoryModal.addEventListener('click', (e) => {
    if (e.target === elements.victoryModal) {
        hideModal(elements.victoryModal);
    }
});

// Keyboard controls
document.addEventListener('keydown', (e) => {
    if (gameState.currentScreen === 'gameBoard' && gameState.puzzle) {
        const emptyIndex = gameState.puzzle.emptyIndex;
        const gridSize = gameState.puzzle.gridSize;
        let targetIndex = -1;
        
        switch (e.key) {
            case 'ArrowUp':
                if (emptyIndex + gridSize < gridSize * gridSize) {
                    targetIndex = emptyIndex + gridSize;
                }
                break;
            case 'ArrowDown':
                if (emptyIndex - gridSize >= 0) {
                    targetIndex = emptyIndex - gridSize;
                }
                break;
            case 'ArrowLeft':
                if (emptyIndex + 1 < gridSize * gridSize && (emptyIndex + 1) % gridSize !== 0) {
                    targetIndex = emptyIndex + 1;
                }
                break;
            case 'ArrowRight':
                if (emptyIndex - 1 >= 0 && emptyIndex % gridSize !== 0) {
                    targetIndex = emptyIndex - 1;
                }
                break;
            case 'r':
            case 'R':
                resetLevel();
                break;
            case 'Escape':
                backToLevels();
                break;
        }
        
        if (targetIndex !== -1) {
            e.preventDefault();
            if (gameState.puzzle.moveTile(targetIndex)) {
                renderPuzzle();
                
                if (gameState.puzzle.isSolved()) {
                    setTimeout(() => {
                        completeLevel();
                    }, 500);
                }
            }
        }
    }
});

// Responsive handling
window.addEventListener('resize', () => {
    if (gameState.currentScreen === 'gameBoard' && gameState.puzzle) {
        renderPuzzle();
    }
});

// Initialize Game
function initializeGame() {
    // Hide loading screen
    setTimeout(() => {
        elements.loadingScreen.classList.add('hidden');
        
        // Show level select screen
        showScreen('levelSelect');
        renderLevels();
    }, 2000);
}

// Start the game
initializeGame();
// In your ript.js file
document.addEventListener('DOMContentLoaded', function() {
    // Show video loading screen initially
    const videoLoadingScreen = document.getElementById('videoLoadingScreen');
    const loadingVideo = document.getElementById('loadingVideo');
    const videoProgressBar = document.getElementById('videoProgressBar');
    const loadingPercentage = document.getElementById('loadingPercentage');
    
    // Simulate loading progress (replace with actual loading logic)
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            setTimeout(() => {
                videoLoadingScreen.style.display = 'none';
                // Show your level select screen or other initial screen
                document.getElementById('levelSelect').classList.add('active');
            }, 500);
        }
        videoProgressBar.style.width = progress + '%';
        loadingPercentage.textContent = Math.floor(progress) + '%';
    }, 300);
    
    // Ensure video can play
    loadingVideo.addEventListener('canplay', function() {
        loadingVideo.play().catch(e => {
            console.log("Video autoplay prevented, showing fallback");
            // Fallback to regular loading screen if video can't autoplay
            videoLoadingScreen.innerHTML = `
                <div class="wave-loader">
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                </div>
                <p>Loading Ocean Quest...</p>
            `;
        });
    });
    
    // Rest of your game code...
});
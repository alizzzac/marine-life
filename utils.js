// Utility functions and data for the fish facts game

// Fish types with their corresponding emojis and facts
const FISH_TYPES = [
    { 
        emoji: '🐠', 
        class: 'fish-red',
        name: 'Tropical Fish',
        fact: 'Tropical fish can see ultraviolet light! This helps them find food and communicate with other fish in ways invisible to human eyes.'
    },
    { 
        emoji: '🐟', 
        class: 'fish-blue',
        name: 'Blue Tang',
        fact: 'Blue tangs can change their color intensity based on their mood and environment. When stressed, they become pale, and when excited, their blue becomes more vibrant!'
    },
    { 
        emoji: '🐡', 
        class: 'fish-green',
        name: 'Pufferfish',
        fact: 'Pufferfish can inflate to 3 times their normal size when threatened! They fill their stomachs with water or air to become a spiky, inedible ball.'
    },
    { 
        emoji: '🦈', 
        class: 'fish-yellow',
        name: 'Shark',
        fact: 'Sharks have been around for over 400 million years - they existed before trees! They\'ve survived 5 major extinction events on Earth.'
    },
    { 
        emoji: '🐙', 
        class: 'fish-purple',
        name: 'Octopus',
        fact: 'Octopuses have three hearts and blue blood! Two hearts pump blood to their gills, while the third pumps blood to the rest of their body.'
    },
    { 
        emoji: '🦑', 
        class: 'fish-pink',
        name: 'Squid',
        fact: 'Giant squids have the largest eyes in the animal kingdom - as big as dinner plates! These massive eyes help them see in the deep, dark ocean.'
    }
];

// Level configurations with increasing difficulty
const LEVEL_CONFIG = [
    { level: 1, target: 1000, moves: 25, fishTypes: 4 },
    { level: 2, target: 1500, moves: 24, fishTypes: 4 },
    { level: 3, target: 2000, moves: 23, fishTypes: 5 },
    { level: 4, target: 2500, moves: 22, fishTypes: 5 },
    { level: 5, target: 3000, moves: 21, fishTypes: 5 },
    { level: 6, target: 3500, moves: 20, fishTypes: 6 },
    { level: 7, target: 4000, moves: 19, fishTypes: 6 },
    { level: 8, target: 4500, moves: 18, fishTypes: 6 },
    { level: 9, target: 5000, moves: 17, fishTypes: 6 },
    { level: 10, target: 6000, moves: 16, fishTypes: 6 }
];

// Bonus fish facts for level completion
const BONUS_FISH_FACTS = [
    {
        emoji: '🐋',
        name: 'Blue Whale',
        fact: 'Blue whales are the largest animals ever known to have lived on Earth! Their hearts alone can weigh as much as a car, and their tongues can weigh as much as an elephant.'
    },
    {
        emoji: '🐬',
        name: 'Dolphin',
        fact: 'Dolphins have names for each other! They develop unique whistle signatures that other dolphins use to call them, just like humans use names.'
    },
    {
        emoji: '🦭',
        name: 'Seal',
        fact: 'Seals can sleep underwater! They can hold their breath for up to 2 hours and often take naps while floating vertically in the water.'
    },
    {
        emoji: '🐢',
        name: 'Sea Turtle',
        fact: 'Sea turtles use Earth\'s magnetic field to navigate across thousands of miles of ocean! They can return to the exact beach where they were born to lay their own eggs.'
    },
    {
        emoji: '🦀',
        name: 'Crab',
        fact: 'Crabs communicate by drumming or waving their claws! Different species have different "languages" and can recognize their own kind by these signals.'
    },
    {
        emoji: '🦞',
        name: 'Lobster',
        fact: 'Lobsters were once considered poor people\'s food! In colonial America, feeding lobster to prisoners more than 3 times a week was considered cruel and unusual punishment.'
    },
    {
        emoji: '🐚',
        name: 'Shell Creatures',
        fact: 'Some shells can live for over 500 years! The oldest known shell creature was a clam that lived for 507 years before scientists accidentally killed it while studying it.'
    },
    {
        emoji: '🦈',
        name: 'Great White Shark',
        fact: 'Great white sharks can detect a single drop of blood in 25 gallons of water! Their sense of smell is so powerful they can smell blood from 3 miles away.'
    },
    {
        emoji: '🐠',
        name: 'Clownfish',
        fact: 'All clownfish are born male! The largest fish in a group will change into a female when needed. This process is irreversible and helps ensure the survival of their species.'
    },
    {
        emoji: '🐟',
        name: 'Flying Fish',
        fact: 'Flying fish can glide through the air for up to 45 seconds and travel distances of up to 1,300 feet! They use their large pectoral fins as wings to escape predators.'
    }
];

// Get random fish type based on level configuration
function getRandomFish(level = 1) {
    const config = LEVEL_CONFIG[level - 1] || LEVEL_CONFIG[0];
    const availableFish = FISH_TYPES.slice(0, config.fishTypes);
    return availableFish[Math.floor(Math.random() * availableFish.length)];
}

// Get level configuration
function getLevelConfig(level) {
    return LEVEL_CONFIG[level - 1] || LEVEL_CONFIG[LEVEL_CONFIG.length - 1];
}

// Get bonus fish fact for level completion
function getBonusFishFact(level) {
    return BONUS_FISH_FACTS[level - 1] || BONUS_FISH_FACTS[Math.floor(Math.random() * BONUS_FISH_FACTS.length)];
}

// Create particle effect
function createParticles(x, y, color) {
    const particlesContainer = document.getElementById('particles');
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.backgroundColor = color;
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        // Random direction and distance
        const angle = (Math.PI * 2 * i) / 8;
        const distance = Math.random() * 50 + 30;
        const deltaX = Math.cos(angle) * distance;
        const deltaY = Math.sin(angle) * distance;
        
        particle.style.setProperty('--deltaX', deltaX + 'px');
        particle.style.setProperty('--deltaY', deltaY + 'px');
        
        particlesContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 2000);
    }
}

// Play sound effect using Web Audio API
function playSound(frequency = 440, duration = 200, type = 'sine') {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = type;
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration / 1000);
    } catch (e) {
        console.log('Sound not supported');
    }
}

// Animate score update
function animateScore(element, newValue) {
    const currentValue = parseInt(element.textContent);
    const increment = Math.ceil((newValue - currentValue) / 20);
    
    if (currentValue < newValue) {
        element.textContent = Math.min(currentValue + increment, newValue);
        requestAnimationFrame(() => animateScore(element, newValue));
    }
}

// Update progress bar
function updateProgressBar(current, target) {
    const progressFill = document.getElementById('progressFill');
    const percentage = Math.min((current / target) * 100, 100);
    progressFill.style.width = percentage + '%';
}

// Check if device supports touch
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// Get tile position from mouse/touch event
function getTilePosition(event, gameBoard) {
    const rect = gameBoard.getBoundingClientRect();
    const x = (event.clientX || event.touches[0].clientX) - rect.left;
    const y = (event.clientY || event.touches[0].clientY) - rect.top;
    
    const tileSize = 54; // tile size + gap
    const col = Math.floor(x / tileSize);
    const row = Math.floor(y / tileSize);
    
    return { row, col };
}

// Debounce function to prevent rapid clicks
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Calculate stars based on score vs target
function calculateStars(score, target) {
    if (score >= target * 2) return 3;
    if (score >= target * 1.5) return 2;
    if (score >= target) return 1;
    return 0;
}

// Save game progress to localStorage
function saveProgress(level, totalScore) {
    const progress = {
        currentLevel: level,
        totalScore: totalScore,
        timestamp: Date.now()
    };
    localStorage.setItem('oceanQuestProgress', JSON.stringify(progress));
}

// Load game progress from localStorage
function loadProgress() {
    const saved = localStorage.getItem('oceanQuestProgress');
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            console.log('Could not load saved progress');
        }
    }
    return { currentLevel: 1, totalScore: 0 };
}
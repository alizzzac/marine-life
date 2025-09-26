const menuToggle = document.getElementById('menuToggle');
const fullscreenMenu = document.getElementById('fullscreenMenu');
const menuBgImage = document.getElementById('menuBgImage');

// Open/close menu
menuToggle.addEventListener('click', () => {
  fullscreenMenu.classList.toggle('active');
});

// Background image transition in nav
const bgImages = [
  'https://images.unsplash.com/photo-1581609855124-4ba7bcee1f0e',
  'https://images.unsplash.com/photo-1559119364-4365d14bab8f',
  'https://images.unsplash.com/photo-1580822181824-d41bc99c0a98'
];

let bgIndex = 0;
setInterval(() => {
  menuBgImage.style.backgroundImage = `url('${bgImages[bgIndex]}')`;
  bgIndex = (bgIndex + 1) % bgImages.length;
}, 4000);

// Products data
const products = [
    {
        id: '1',
        name: 'Ocean Guardian Bracelet',
        description: 'Handcrafted from recycled ocean plastic. Each bracelet removes 1 pound of plastic from the ocean.',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=300&fit=crop',
        impact: 'Removes 1lb of ocean plastic',
        category: 'Accessories'
    },
    {
        id: '2',
        name: 'Coral Reef Restoration Kit',
        description: 'Support coral reef restoration projects. Your purchase funds coral transplantation efforts.',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
        impact: 'Funds 5 coral transplants',
        category: 'Conservation'
    },
    {
        id: '3',
        name: 'Sea Turtle Adoption Pack',
        description: 'Adopt a sea turtle and track their journey. Includes adoption certificate and updates.',
        price: 49.99,
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
        impact: 'Protects 1 sea turtle',
        category: 'Adoption'
    },
    {
        id: '4',
        name: 'Ocean Hero T-Shirt',
        description: 'Made from organic cotton and ocean plastic fibers. Comfortable and sustainable.',
        price: 34.99,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
        impact: 'Recycles 8 plastic bottles',
        category: 'Apparel'
    },
    {
        id: '5',
        name: 'Marine Wildlife Calendar',
        description: 'Beautiful 2024 calendar featuring rescued marine animals. Proceeds support wildlife rehabilitation.',
        price: 19.99,
        image: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=400&h=300&fit=crop',
        impact: 'Supports wildlife rehabilitation',
        category: 'Education'
    },
    {
        id: '6',
        name: 'Whale Song Collection',
        description: 'Premium audio collection of whale songs for meditation and relaxation. Digital download.',
        price: 14.99,
        image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300&fit=crop',
        impact: 'Funds whale research',
        category: 'Digital'
    },
    {
        id: '7',
        name: 'Eco-Friendly Beach Cleanup Kit',
        description: 'Complete kit with reusable bags, gloves, and tools for organizing beach cleanups.',
        price: 39.99,
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
        impact: 'Enables cleanup of 2 miles of beach',
        category: 'Equipment'
    },
    {
        id: '8',
        name: 'Dolphin Sanctuary Hoodie',
        description: 'Ultra-soft hoodie made from recycled materials. Features stunning dolphin artwork.',
        price: 54.99,
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=300&fit=crop',
        impact: 'Supports dolphin sanctuary care',
        category: 'Apparel'
    },
    {
        id: '9',
        name: 'Shark Conservation Water Bottle',
        description: 'Stainless steel bottle that helps fund shark conservation research and protection.',
        price: 24.99,
        image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=300&fit=crop',
        impact: 'Funds shark tracking research',
        category: 'Accessories'
    },
    {
        id: '10',
        name: 'Ocean Documentary Collection',
        description: 'Digital access to 12 award-winning ocean documentaries. Educational and inspiring.',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
        impact: 'Educates 100 students about oceans',
        category: 'Digital'
    },
    {
        id: '11',
        name: 'Jellyfish Protection Fund',
        description: 'Direct donation to jellyfish habitat protection. Receive updates on conservation efforts.',
        price: 75.00,
        image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400&h=300&fit=crop',
        impact: 'Protects 1 acre of jellyfish habitat',
        category: 'Conservation'
    },
    {
        id: '12',
        name: 'Sustainable Surf Board Wax',
        description: 'Eco-friendly surf wax made from natural ingredients. Biodegradable and ocean-safe.',
        price: 12.99,
        image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=400&h=300&fit=crop',
        impact: 'Replaces 5 toxic wax bars',
        category: 'Sports'
    },
    {
        id: '13',
        name: 'Manatee Plush & Adoption',
        description: 'Adorable manatee plush toy with real animal adoption. Perfect for kids and adults.',
        price: 44.99,
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
        impact: 'Supports manatee rehabilitation',
        category: 'Adoption'
    },
    {
        id: '14',
        name: 'Ocean Cleanup Drone Sponsorship',
        description: 'Sponsor ocean cleanup drone operations for one day. Track progress via app.',
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=300&fit=crop',
        impact: 'Removes 50lbs of ocean debris',
        category: 'Technology'
    },
    {
        id: '15',
        name: 'Seaweed Farming Starter Kit',
        description: 'Learn about sustainable seaweed farming. Kit includes seeds, guide, and tracking tools.',
        price: 67.99,
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
        impact: 'Absorbs 20lbs of CO2 annually',
        category: 'Education'
    },
    {
        id: '16',
        name: 'Ocean Photographer Print Set',
        description: 'Limited edition prints from renowned ocean photographers. High-quality museum prints.',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
        impact: 'Funds underwater photography expeditions',
        category: 'Art'
    },
    {
        id: '17',
        name: 'Reef-Safe Sunscreen Bundle',
        description: 'Pack of 3 reef-safe sunscreens. Protect your skin and marine ecosystems.',
        price: 31.99,
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
        impact: 'Prevents coral bleaching',
        category: 'Personal Care'
    },
    {
        id: '18',
        name: 'Ocean Meditation App Premium',
        description: 'Year-long access to ocean sounds, guided meditations, and whale song therapy.',
        price: 47.99,
        image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300&fit=crop',
        impact: 'Funds marine sound research',
        category: 'Digital'
    },
    {
        id: '19',
        name: 'Penguin Colony Protection Fund',
        description: 'Support Antarctic penguin colonies affected by climate change. Track colony health updates.',
        price: 95.00,
        image: 'https://images.unsplash.com/photo-1551986782-d0169b3f8fa7?w=400&h=300&fit=crop',
        impact: 'Protects 50 penguin families',
        category: 'Conservation'
    },
    {
        id: '20',
        name: 'Ocean Explorer VR Experience',
        description: 'Virtual reality ocean exploration with educational content. Compatible with all VR headsets.',
        price: 39.99,
        image: 'https://images.unsplash.com/photo-1593062096033-9a26b36de1c2?w=400&h=300&fit=crop',
        impact: 'Inspires 500 ocean advocates',
        category: 'Technology'
    }
];

// Rescue stories data
const rescueStories = [
    {
        id: '1',
        title: 'Dolphin Family Reunited',
        description: 'Thanks to your support, this dolphin family was successfully rescued from polluted waters and released back to their natural habitat after rehabilitation.',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=300&fit=crop',
        animalType: 'Dolphins',
        location: 'Pacific Coast',
        impact: '3 dolphins saved'
    },
    {
        id: '2',
        title: 'Baby Turtles Find Their Way Home',
        description: 'Your purchase helped protect this nesting beach, allowing hundreds of baby sea turtles to safely reach the ocean for the first time.',
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=300&fit=crop',
        animalType: 'Sea Turtles',
        location: 'Costa Rica',
        impact: '200+ hatchlings protected'
    },
    {
        id: '3',
        title: 'Humpback Whale Freed from Nets',
        description: 'Our rescue team was able to free this magnificent humpback whale from abandoned fishing nets, giving it a second chance at life.',
        image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=300&fit=crop',
        animalType: 'Humpback Whale',
        location: 'North Atlantic',
        impact: '1 whale saved'
    },
    {
        id: '4',
        title: 'Coral Reef Restoration Success',
        description: 'This thriving coral reef was restored using funds from purchases like yours, creating a new home for countless marine species.',
        image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=600&h=300&fit=crop',
        animalType: 'Marine Ecosystem',
        location: 'Great Barrier Reef',
        impact: '500 sq ft of reef restored'
    }
];

// Shopping cart state
let cart = [];
let isCartOpen = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    updateCartBadge();
    loadCartFromStorage();
});

// Render products grid
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    
    products.forEach((product, index) => {
        const productCard = createProductCard(product, index);
        productsGrid.appendChild(productCard);
    });
}

// Create product card element
function createProductCard(product, index) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.animationDelay = `${index * 100}ms`;
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <div class="product-category">${product.category}</div>
            <button class="like-btn" onclick="toggleLike(this)">
                <span>♡</span>
            </button>
        </div>
        <div class="product-content">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-impact">
                <span>🌊</span>
                <span>${product.impact}</span>
            </div>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <button class="add-to-cart-btn" onclick="addToCart('${product.id}')">
                <span>🛒</span>
                Add to Cart
            </button>
        </div>
    `;
    
    return card;
}

// Toggle like button
function toggleLike(button) {
    button.classList.toggle('liked');
    const heart = button.querySelector('span');
    heart.textContent = button.classList.contains('liked') ? '♥' : '♡';
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartDisplay();
    updateCartBadge();
    saveCartToStorage();
    showRescueModal(product.name);
    showToast('Added to cart!', `${product.name} has been added to your cart. You're helping save marine life! 🌊`);
}

// Update cart badge
function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? 'flex' : 'none';
}

// Open cart sidebar
function openCart() {
    document.getElementById('cartSidebar').classList.add('open');
    document.getElementById('cartOverlay').classList.add('active');
    isCartOpen = true;
    updateCartDisplay();
}

// Close cart sidebar
function closeCart() {
    document.getElementById('cartSidebar').classList.remove('open');
    document.getElementById('cartOverlay').classList.remove('active');
    isCartOpen = false;
}

// Update cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartFooter = document.getElementById('cartFooter');
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <h4>Your cart is empty</h4>
                <p>Start shopping to help save marine life!</p>
            </div>
        `;
        cartFooter.style.display = 'none';
    } else {
        cartItems.innerHTML = cart.map(item => createCartItemHTML(item)).join('');
        cartFooter.style.display = 'block';
        updateCartTotals();
    }
}

// Create cart item HTML
function createCartItemHTML(item) {
    return `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-impact">
                    <span>🌊</span>
                    <span>${item.impact}</span>
                </div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-controls">
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity - 1})">−</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                    </div>
                    <button class="remove-btn" onclick="removeFromCart('${item.id}')">🗑️</button>
                </div>
            </div>
        </div>
    `;
}

// Update item quantity
function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        updateCartDisplay();
        updateCartBadge();
        saveCartToStorage();
    }
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    updateCartBadge();
    saveCartToStorage();
}

// Update cart totals
function updateCartTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const conservationAmount = subtotal * 0.3;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('conservationAmount').textContent = `$${conservationAmount.toFixed(2)}`;
    document.getElementById('conservationTotal').textContent = `$${conservationAmount.toFixed(2)}`;
    document.getElementById('finalTotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('checkoutTotal').textContent = `$${subtotal.toFixed(2)}`;
}

// Checkout function
function checkout() {
    if (cart.length === 0) return;
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const conservationAmount = total * 0.3;
    
    alert(`Thank you for your purchase! $${conservationAmount.toFixed(2)} from your $${total.toFixed(2)} order is going directly to ocean conservation efforts. 🌊`);
    
    cart = [];
    updateCartDisplay();
    updateCartBadge();
    saveCartToStorage();
    closeCart();
}

// Show rescue modal
function showRescueModal(productName) {
    const modal = document.getElementById('rescueModal');
    const randomStory = rescueStories[Math.floor(Math.random() * rescueStories.length)];
    
    document.getElementById('purchasedProduct').textContent = productName;
    document.getElementById('rescueImage').src = randomStory.image;
    document.getElementById('rescueCategory').textContent = randomStory.animalType;
    document.getElementById('rescueTitle').textContent = randomStory.title;
    document.getElementById('rescueStoryText').textContent = randomStory.description;
    document.getElementById('rescueLocation').textContent = randomStory.location;
    document.getElementById('rescueImpact').textContent = randomStory.impact;
    
    modal.classList.add('active');
}

// Close rescue modal
function closeRescueModal() {
    document.getElementById('rescueModal').classList.remove('active');
}

// Show toast notification
function showToast(title, message) {
    const toast = document.getElementById('toast');
    document.getElementById('toastTitle').textContent = title;
    document.getElementById('toastMessage').textContent = message;
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// Save cart to localStorage
function saveCartToStorage() {
    localStorage.setItem('oceanCart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('oceanCart');
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
            updateCartBadge();
        } catch (error) {
            console.error('Error loading cart from storage:', error);
            cart = [];
        }
    }
}

// Close modals when clicking outside
document.addEventListener('click', function(event) {
    const rescueModal = document.getElementById('rescueModal');
    if (event.target === rescueModal) {
        closeRescueModal();
    }
});

// Handle escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        if (isCartOpen) {
            closeCart();
        }
        if (document.getElementById('rescueModal').classList.contains('active')) {
            closeRescueModal();
        }
    }
});
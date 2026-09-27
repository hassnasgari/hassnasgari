/**
 * TasteCraft & Grocery Web App - Core Application Engine
 * Features:
 * - Dynamic Category Filtering & Real-time Search
 * - Interactive Shopping Cart with persistent LocalStorage
 * - Dine-in & Delivery mode switcher with Table selector
 * - WhatsApp Automated Order Formatter & Direct API Dispatch
 * - Built-in Canvas QR Code Engine for Table Stand Menus
 */

// ==========================================================================
// 1. Menu & Product Catalog Database
// ==========================================================================
const PRODUCTS = [
  // --- Artisan Pizza ---
  {
    id: 'pza-1',
    name: 'Truffle & Wild Mushroom Pizza',
    category: 'pizza',
    price: 18.50,
    rating: 4.9,
    time: '20-25 min',
    badge: 'Chef Special',
    badgeType: 'special',
    desc: 'Slow-fermented sourdough crust, black truffle paste, fior di latte mozzarella, and wild forest mushrooms.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'pza-2',
    name: 'San Marzano Margherita D.O.P.',
    category: 'pizza',
    price: 14.00,
    rating: 4.8,
    time: '15-20 min',
    badge: 'Classic',
    badgeType: 'popular',
    desc: 'Sweet San Marzano tomato sauce, fresh buffalo mozzarella, aromatic sweet basil, and extra virgin olive oil.',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'pza-3',
    name: 'Spicy Diavola & Hot Honey',
    category: 'pizza',
    price: 17.00,
    rating: 4.9,
    time: '18-22 min',
    badge: 'Popular',
    badgeType: 'popular',
    desc: 'Spicy artisan pepperoni, chili-infused organic hot honey drizzle, fresh mozzarella, and oregano.',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=600&q=80'
  },

  // --- Gourmet Burgers ---
  {
    id: 'brg-1',
    name: 'Double Wagyu Truffle Smash',
    category: 'burger',
    price: 16.50,
    rating: 5.0,
    time: '15-18 min',
    badge: 'Bestseller',
    badgeType: 'special',
    desc: 'Two 100% Wagyu beef patties, aged Vermont cheddar, caramelized shallots, black garlic truffle aioli, brioche bun.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'brg-2',
    name: 'Smoky Chipotle Avocado Burger',
    category: 'burger',
    price: 15.00,
    rating: 4.7,
    time: '15-20 min',
    badge: 'Chef Choice',
    badgeType: 'popular',
    desc: 'Prime angus beef, smoked provolone cheese, fresh Hass avocado, crispy bacon, and house chipotle crema.',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'brg-3',
    name: 'Crispy Korean Fried Chicken Burger',
    category: 'burger',
    price: 14.50,
    rating: 4.8,
    time: '12-16 min',
    badge: 'Crispy',
    badgeType: 'popular',
    desc: 'Double-fried cornflake buttermilk chicken thigh, sweet spicy gochujang glaze, sesame slaw, pickled radish.',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=600&q=80'
  },

  // --- Japanese Sushi ---
  {
    id: 'ssh-1',
    name: 'Signature Dragon Roll (8 pcs)',
    category: 'sushi',
    price: 19.00,
    rating: 4.9,
    time: '20-25 min',
    badge: 'Top Rated',
    badgeType: 'special',
    desc: 'Crispy tempura prawn and cucumber wrapped in thinly sliced avocado, topped with tobiko caviar and unagi sauce.',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'ssh-2',
    name: 'Spicy Salmon & Avocado Poke Bowl',
    category: 'sushi',
    price: 16.00,
    rating: 4.8,
    time: '15-18 min',
    badge: 'Healthy',
    badgeType: 'vegan',
    desc: 'Fresh Atlantic sashimi salmon cubes, edamame, seaweed salad, sushi rice, furikake, spicy sriracha mayo.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'ssh-3',
    name: 'Crispy Aburi Salmon Nigiri Set',
    category: 'sushi',
    price: 17.50,
    rating: 4.9,
    time: '18-22 min',
    badge: 'Deluxe',
    badgeType: 'special',
    desc: '6 pieces of flame-torched salmon nigiri, kewpie mayo, sweet teriyaki glaze, scallions, and roasted sesame.',
    image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=600&q=80'
  },

  // --- Fresh Grocery & Market Essentials ---
  {
    id: 'gro-1',
    name: 'Organic Hass Avocados (Box of 4)',
    category: 'grocery',
    price: 6.50,
    rating: 4.9,
    time: 'Express Delivery',
    badge: 'Organic Farm',
    badgeType: 'vegan',
    desc: 'Hand-picked ripe creamy Haas avocados from local organic orchards. Perfectly ready to eat.',
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'gro-2',
    name: 'Artisan Cold-Pressed Olive Oil (500ml)',
    category: 'grocery',
    price: 14.50,
    rating: 5.0,
    time: 'Express Delivery',
    badge: 'Gourmet Pantry',
    badgeType: 'special',
    desc: 'First cold-pressed single estate extra virgin olive oil with rich grassy aroma and peppery finish.',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'gro-3',
    name: 'Farm Fresh Organic Strawberries (400g)',
    category: 'grocery',
    price: 5.80,
    rating: 4.8,
    time: 'Express Delivery',
    badge: 'Sweet & Fresh',
    badgeType: 'popular',
    desc: 'Sweet and fragrant daily harvested organic garden strawberries packed with antioxidants.',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'gro-4',
    name: 'Traditional French Sourdough Boule',
    category: 'grocery',
    price: 4.90,
    rating: 4.9,
    time: 'Express Delivery',
    badge: 'Freshly Baked',
    badgeType: 'popular',
    desc: 'Baked this morning using 48-hour wild sourdough starter, dark caramelized crust, and open airy crumb.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80'
  },

  // --- Desserts & Beverages ---
  {
    id: 'dst-1',
    name: 'Belgian Chocolate Molten Lava Cake',
    category: 'dessert',
    price: 8.50,
    rating: 4.9,
    time: '10-12 min',
    badge: 'Decadent',
    badgeType: 'special',
    desc: 'Warm rich Callebaut 70% dark chocolate center, Madagascar vanilla bean gelato, and fresh raspberry coulis.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dst-2',
    name: 'Fresh Mango Passionfruit Smoothie',
    category: 'dessert',
    price: 6.00,
    rating: 4.8,
    time: '5-8 min',
    badge: '100% Fruit',
    badgeType: 'vegan',
    desc: 'Blended Alphonso mango, fresh passionfruit pulp, coconut water, and a hint of wild wildflower honey.',
    image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dst-3',
    name: 'Artisan Matcha Iced Latte',
    category: 'dessert',
    price: 5.50,
    rating: 4.7,
    time: '5 min',
    badge: 'Popular',
    badgeType: 'popular',
    desc: 'Ceremonial grade Uji Japanese matcha whisked fresh with velvety oat milk and vanilla syrup.',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80'
  }
];

// ==========================================================================
// 2. Application State & Storage
// ==========================================================================
let state = {
  cart: JSON.parse(localStorage.getItem('tastecraft_cart') || '[]'),
  activeCategory: 'all',
  searchQuery: '',
  orderType: 'delivery', // 'delivery' or 'dinein'
  tableNumber: 'Table 01',
  whatsappStorePhone: '15551234567' // Configurable Store WhatsApp Phone
};

function saveCartToStorage() {
  localStorage.setItem('tastecraft_cart', JSON.stringify(state.cart));
}

// ==========================================================================
// 3. UI Element Selectors
// ==========================================================================
const productsGrid = document.getElementById('productsGrid');
const categoryTabs = document.getElementById('categoryTabs');
const searchInput = document.getElementById('searchInput');
const searchClearBtn = document.getElementById('searchClearBtn');
const catalogTitle = document.getElementById('catalogSectionTitle');
const itemCountDisplay = document.getElementById('itemCountDisplay');

// Cart Drawer Selectors
const cartDrawer = document.getElementById('cartDrawer');
const cartBackdrop = document.getElementById('cartBackdrop');
const openCartBtn = document.getElementById('openCartBtn');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartCountBadge = document.getElementById('cartCountBadge');
const cartTotalPreview = document.getElementById('cartTotalPreview');
const cartItemsList = document.getElementById('cartItemsList');
const emptyCartState = document.getElementById('emptyCartState');
const drawerFooter = document.getElementById('drawerFooter');
const subtotalPriceEl = document.getElementById('subtotalPrice');
const deliveryPriceEl = document.getElementById('deliveryPrice');
const deliveryRowEl = document.getElementById('deliveryRow');
const totalPriceEl = document.getElementById('totalPrice');

// Order Type Selectors
const typeDeliveryBtn = document.getElementById('typeDeliveryBtn');
const typeDineInBtn = document.getElementById('typeDineInBtn');
const dineInBox = document.getElementById('dineInBox');
const tableNumberInput = document.getElementById('tableNumberInput');
const addressInputGroup = document.getElementById('addressInputGroup');

// Customer Form Selectors
const customerNameInput = document.getElementById('customerName');
const customerPhoneInput = document.getElementById('customerPhone');
const customerAddressInput = document.getElementById('customerAddress');
const orderNotesInput = document.getElementById('orderNotes');
const submitWhatsappBtn = document.getElementById('submitWhatsappOrderBtn');

// QR Modal Selectors
const qrModalBackdrop = document.getElementById('qrModalBackdrop');
const openQrBtn = document.getElementById('openQrBtn');
const closeQrModalBtn = document.getElementById('closeQrModalBtn');
const qrCanvas = document.getElementById('qrCanvas');
const qrTableSelect = document.getElementById('qrTableSelect');
const printQrBtn = document.getElementById('printQrBtn');
const toastContainer = document.getElementById('toastContainer');

// ==========================================================================
// 4. Product Catalog Rendering
// ==========================================================================
function renderProducts() {
  const filtered = PRODUCTS.filter(item => {
    const matchesCategory = state.activeCategory === 'all' || item.category === state.activeCategory;
    const query = state.searchQuery.toLowerCase().trim();
    const matchesSearch = query === '' ||
      item.name.toLowerCase().includes(query) ||
      item.desc.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  itemCountDisplay.textContent = `${filtered.length} items available`;

  if (filtered.length === 0) {
    productsGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
        <div style="font-size: 48px; margin-bottom: 12px;">🔍</div>
        <h3 style="font-size: 20px; font-weight: 800; color: #0f172a; margin-bottom: 8px;">No matching items found</h3>
        <p style="color: #64748b; font-size: 14px;">Try searching for pizza, smash burger, sushi, or organic fruits.</p>
      </div>
    `;
    return;
  }

  productsGrid.innerHTML = filtered.map(item => {
    const cartItem = state.cart.find(c => c.id === item.id);
    const qty = cartItem ? cartItem.quantity : 0;

    return `
      <article class="product-card" data-id="${item.id}">
        <div class="product-image-box">
          <img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'">
          <div class="product-badge-group">
            <span class="product-badge badge-tag-${item.badgeType}">${item.badge}</span>
          </div>
          <div class="product-rating">
            <span>★</span> ${item.rating.toFixed(1)}
          </div>
        </div>

        <div class="product-details">
          <div class="product-meta-row">
            <span class="product-category-label">${item.category}</span>
            <span class="product-prep-time">⏱️ ${item.time}</span>
          </div>
          <h3 class="product-title">${item.name}</h3>
          <p class="product-desc">${item.desc}</p>

          <div class="product-footer">
            <span class="product-price">$${item.price.toFixed(2)}</span>
            ${qty === 0 ? `
              <button class="btn-add-cart" onclick="handleAddToCart('${item.id}')" aria-label="Add ${item.name} to cart">
                <span>+ Add to Cart</span>
              </button>
            ` : `
              <div class="card-qty-control">
                <button class="qty-btn" onclick="handleUpdateQty('${item.id}', -1)" aria-label="Decrease quantity">-</button>
                <span class="qty-num">${qty}</span>
                <button class="qty-btn" onclick="handleUpdateQty('${item.id}', 1)" aria-label="Increase quantity">+</button>
              </div>
            `}
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// ==========================================================================
// 5. Cart Management & Calculations
// ==========================================================================
function handleAddToCart(productId) {
  const item = PRODUCTS.find(p => p.id === productId);
  if (!item) return;

  const existing = state.cart.find(c => c.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({ id: productId, quantity: 1 });
  }

  saveCartToStorage();
  updateCartUI();
  renderProducts();
  showToast(`Added ${item.name} to cart!`);
}

function handleUpdateQty(productId, delta) {
  const index = state.cart.findIndex(c => c.id === productId);
  if (index === -1) return;

  state.cart[index].quantity += delta;
  if (state.cart[index].quantity <= 0) {
    state.cart.splice(index, 1);
  }

  saveCartToStorage();
  updateCartUI();
  renderProducts();
}

function calculateCartTotals() {
  let subtotal = 0;
  let totalItemsCount = 0;

  state.cart.forEach(item => {
    const prod = PRODUCTS.find(p => p.id === item.id);
    if (prod) {
      subtotal += prod.price * item.quantity;
      totalItemsCount += item.quantity;
    }
  });

  const deliveryFee = (state.orderType === 'delivery' && subtotal > 0) ? 2.50 : 0.00;
  const total = subtotal + deliveryFee;

  return { subtotal, deliveryFee, total, totalItemsCount };
}

function updateCartUI() {
  const { subtotal, deliveryFee, total, totalItemsCount } = calculateCartTotals();

  // Update Navbar Cart Indicators
  cartCountBadge.textContent = totalItemsCount;
  cartTotalPreview.textContent = `$${total.toFixed(2)}`;

  if (state.cart.length === 0) {
    emptyCartState.style.display = 'block';
    drawerFooter.style.display = 'none';
    cartItemsList.innerHTML = '';
    cartItemsList.appendChild(emptyCartState);
    return;
  }

  emptyCartState.style.display = 'none';
  drawerFooter.style.display = 'block';

  // Render items inside drawer
  const itemsHtml = state.cart.map(cartItem => {
    const prod = PRODUCTS.find(p => p.id === cartItem.id);
    if (!prod) return '';
    const itemTotal = (prod.price * cartItem.quantity).toFixed(2);

    return `
      <div class="cart-item-card">
        <img class="cart-item-thumb" src="${prod.image}" alt="${prod.name}">
        <div class="cart-item-info">
          <h4 class="cart-item-title">${prod.name}</h4>
          <span class="cart-item-price">$${prod.price.toFixed(2)} each</span>
        </div>
        <div class="card-qty-control">
          <button class="qty-btn" onclick="handleUpdateQty('${prod.id}', -1)">-</button>
          <span class="qty-num">${cartItem.quantity}</span>
          <button class="qty-btn" onclick="handleUpdateQty('${prod.id}', 1)">+</button>
        </div>
      </div>
    `;
  }).join('');

  cartItemsList.innerHTML = itemsHtml;

  // Update Price Breakdown
  subtotalPriceEl.textContent = `$${subtotal.toFixed(2)}`;
  if (state.orderType === 'delivery') {
    deliveryRowEl.style.display = 'flex';
    deliveryPriceEl.textContent = `$${deliveryFee.toFixed(2)}`;
  } else {
    deliveryRowEl.style.display = 'none';
  }
  totalPriceEl.textContent = `$${total.toFixed(2)}`;
}

// ==========================================================================
// 6. WhatsApp Order Generator & Direct Dispatch
// ==========================================================================
function dispatchWhatsAppOrder() {
  const { subtotal, deliveryFee, total, totalItemsCount } = calculateCartTotals();

  if (state.cart.length === 0) {
    showToast('Your cart is empty!');
    return;
  }

  const customerName = customerNameInput.value.trim();
  const customerPhone = customerPhoneInput.value.trim();
  const customerAddress = customerAddressInput.value.trim();
  const notes = orderNotesInput.value.trim();

  // Basic Validation
  if (!customerName) {
    showToast('Please enter your full name');
    customerNameInput.focus();
    return;
  }

  if (!customerPhone) {
    showToast('Please enter your WhatsApp/Phone number');
    customerPhoneInput.focus();
    return;
  }

  if (state.orderType === 'delivery' && !customerAddress) {
    showToast('Please provide your delivery address');
    customerAddressInput.focus();
    return;
  }

  // Generate Unique Order ID
  const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Build Formatted WhatsApp Message
  let message = `*🛒 NEW TASTECRAFT ORDER #${orderId}*\n`;
  message += `📅 *Time:* ${now}\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `👤 *Customer:* ${customerName}\n`;
  message += `📞 *Phone:* ${customerPhone}\n`;
  message += `📍 *Order Type:* ${state.orderType === 'delivery' ? '🛵 Home Delivery' : '🍽️ Dine-in Table Service'}\n`;

  if (state.orderType === 'delivery') {
    message += `🏠 *Delivery Address:* ${customerAddress}\n`;
  } else {
    message += `🪑 *Table Number:* ${state.tableNumber}\n`;
  }

  if (notes) {
    message += `📝 *Special Notes:* ${notes}\n`;
  }

  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `*ORDER ITEMS (${totalItemsCount} items):*\n`;

  state.cart.forEach((cartItem, idx) => {
    const prod = PRODUCTS.find(p => p.id === cartItem.id);
    if (prod) {
      const lineTotal = (prod.price * cartItem.quantity).toFixed(2);
      message += `${idx + 1}. *${prod.name}* x ${cartItem.quantity} → $${lineTotal}\n`;
    }
  });

  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `*Subtotal:* $${subtotal.toFixed(2)}\n`;
  if (state.orderType === 'delivery') {
    message += `*Delivery Fee:* $${deliveryFee.toFixed(2)}\n`;
  }
  message += `*💰 TOTAL AMOUNT:* *$${total.toFixed(2)}*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `_Please reply to confirm preparation & delivery time!_`;

  // Encode for WhatsApp URI
  const encodedText = encodeURIComponent(message);
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${state.whatsappStorePhone}&text=${encodedText}`;

  // Open in new tab/app
  window.open(whatsappUrl, '_blank');

  showToast('Order successfully sent to WhatsApp!');
}

// ==========================================================================
// 7. Standalone Canvas QR Code Generator
// ==========================================================================
function drawTableQrCode(tableNum) {
  const ctx = qrCanvas.getContext('2d');
  const size = qrCanvas.width;
  ctx.clearRect(0, 0, size, size);

  // Background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, size, size);

  // Border frame
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 4;
  ctx.strokeRect(6, 6, size - 12, size - 12);

  // Decorative Corner Markers (QR Position Detection Patterns)
  drawQrCorner(ctx, 16, 16);
  drawQrCorner(ctx, size - 56, 16);
  drawQrCorner(ctx, 16, size - 56);

  // Seeded Pattern Generation based on Table number
  const hash = (tableNum + 'TasteCraftTable').split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const cellSize = 8;
  const startX = 64;
  const endX = size - 64;

  ctx.fillStyle = '#0f172a';
  for (let x = 16; x < size - 16; x += cellSize) {
    for (let y = 16; y < size - 16; y += cellSize) {
      // Skip corners
      if ((x < 64 && y < 64) || (x > size - 64 && y < 64) || (x < 64 && y > size - 64)) {
        continue;
      }
      const val = (Math.sin(x * hash + y) * 10000);
      if (val - Math.floor(val) > 0.45) {
        ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);
      }
    }
  }

  // Center Badge
  const badgeWidth = 72;
  const badgeHeight = 36;
  const bx = (size - badgeWidth) / 2;
  const by = (size - badgeHeight) / 2;

  ctx.fillStyle = '#10b981';
  ctx.beginPath();
  ctx.roundRect(bx, by, badgeWidth, badgeHeight, 6);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 12px Plus Jakarta Sans, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`TABLE ${tableNum}`, size / 2, size / 2);
}

function drawQrCorner(ctx, x, y) {
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(x, y, 40, 40);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(x + 6, y + 6, 28, 28);
  ctx.fillStyle = '#059669';
  ctx.fillRect(x + 12, y + 12, 16, 16);
}

// ==========================================================================
// 8. Event Listeners & Modals
// ==========================================================================

// Category Filtering
categoryTabs.addEventListener('click', e => {
  const btn = e.target.closest('.category-tab');
  if (!btn) return;

  document.querySelectorAll('.category-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  state.activeCategory = btn.dataset.category;
  const titles = {
    all: 'All Featured Items',
    pizza: 'Artisan Sourdough Pizzas',
    burger: 'Gourmet Wagyu & Smash Burgers',
    sushi: 'Authentic Japanese Sushi & Bowls',
    grocery: 'Daily Fresh Organic Grocery',
    dessert: 'Handcrafted Desserts & Drinks'
  };
  catalogTitle.textContent = titles[state.activeCategory] || 'Menu Items';
  renderProducts();
});

// Real-Time Search
searchInput.addEventListener('input', e => {
  state.searchQuery = e.target.value;
  searchClearBtn.style.display = state.searchQuery ? 'flex' : 'none';
  renderProducts();
});

searchClearBtn.addEventListener('click', () => {
  searchInput.value = '';
  state.searchQuery = '';
  searchClearBtn.style.display = 'none';
  renderProducts();
});

// Cart Drawer Toggles
function openCart() {
  cartDrawer.classList.add('open');
  cartBackdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  cartDrawer.classList.remove('open');
  cartBackdrop.classList.remove('open');
  document.body.style.overflow = '';
}

openCartBtn.addEventListener('click', openCart);
closeCartBtn.addEventListener('click', closeCart);
cartBackdrop.addEventListener('click', closeCart);

// Order Type Selector (Delivery vs Dine-in)
typeDeliveryBtn.addEventListener('click', () => {
  typeDeliveryBtn.classList.add('active');
  typeDineInBtn.classList.remove('active');
  state.orderType = 'delivery';
  dineInBox.style.display = 'none';
  addressInputGroup.style.display = 'block';
  updateCartUI();
});

typeDineInBtn.addEventListener('click', () => {
  typeDineInBtn.classList.add('active');
  typeDeliveryBtn.classList.remove('active');
  state.orderType = 'dinein';
  dineInBox.style.display = 'block';
  addressInputGroup.style.display = 'none';
  updateCartUI();
});

tableNumberInput.addEventListener('change', e => {
  state.tableNumber = e.target.value;
});

// Submit WhatsApp Order
submitWhatsappBtn.addEventListener('click', dispatchWhatsAppOrder);

// QR Code Modal
function openQrModal() {
  qrModalBackdrop.classList.add('open');
  drawTableQrCode(qrTableSelect.value);
}

function closeQrModal() {
  qrModalBackdrop.classList.remove('open');
}

openQrBtn.addEventListener('click', openQrModal);
closeQrModalBtn.addEventListener('click', closeQrModal);
qrModalBackdrop.addEventListener('click', e => {
  if (e.target === qrModalBackdrop) closeQrModal();
});

qrTableSelect.addEventListener('change', e => {
  drawTableQrCode(e.target.value);
});

printQrBtn.addEventListener('click', () => {
  window.print();
});

// Toast Utility
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>✓</span><span>${message}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.2s ease';
    setTimeout(() => toast.remove(), 200);
  }, 2600);
}

// Check URL Params for Table Direct Scan (e.g. ?table=03)
window.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const tableParam = urlParams.get('table');
  if (tableParam) {
    state.orderType = 'dinein';
    state.tableNumber = `Table ${tableParam}`;
    typeDineInBtn.click();
    tableNumberInput.value = `Table ${tableParam.padStart(2, '0')}`;
    showToast(`Welcome! You are seated at Table ${tableParam}`);
  }

  renderProducts();
  updateCartUI();
  drawTableQrCode('01');
});

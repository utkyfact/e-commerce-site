// DOM Elements
const elements = {
    categoryBtn: document.getElementById('btn-category'),
    categoryOpen: document.querySelector('.category-open'),
    contentAlt: document.querySelector('.content-alt'),
    cardsAlt: document.querySelector('.cards-alt'),
    contentSlide: document.querySelector('.content-slide'),
    wrapper: document.querySelector('.wrapper'),
    badge: document.querySelector('.badge')
};

// Constants
const LOCAL_STORAGE_KEYS = {
    CART: 'sepet',
    REGISTRATION: 'kayit'
};

// Local Storage Utilities
class StorageManager {
    static initializeStorage(key) {
        const data = JSON.parse(localStorage.getItem(key));
        if (!data) {
            localStorage.setItem(key, JSON.stringify([]));
        }
    }

    static getItems(key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    }

    static setItems(key, items) {
        localStorage.setItem(key, JSON.stringify(items));
    }
}

// Cart Management
class CartManager {
    static initialize() {
        StorageManager.initializeStorage(LOCAL_STORAGE_KEYS.CART);
        StorageManager.initializeStorage(LOCAL_STORAGE_KEYS.REGISTRATION);
        CartManager.updateBadge();
    }

    static addToCart(id) {
        const card = document.getElementById(id);
        if (!card) return;

        const item = {
            id,
            name: card.querySelector('.bilgi').textContent,
            price: card.querySelector('.fiyat').textContent,
            resim: card.querySelector('img').src,
            adet: 1
        };

        const cartItems = StorageManager.getItems(LOCAL_STORAGE_KEYS.CART);
        const existingItem = cartItems.find(i => i.id === item.id);

        if (existingItem) {
            existingItem.adet += 1;
            existingItem.price = existingItem.adet * Number(item.price);
        } else {
            cartItems.push(item);
        }

        StorageManager.setItems(LOCAL_STORAGE_KEYS.CART, cartItems);
        CartManager.updateBadge();
    }

    static updateBadge() {
        const cartItems = StorageManager.getItems(LOCAL_STORAGE_KEYS.CART);
        elements.badge.textContent = cartItems.length;
    }
}

// Product Card Rendering
class ProductRenderer {
    static async fetchAndRenderMainCards() {
        try {
            const response = await fetch('card.json');
            const data = await response.json();
            ProductRenderer.renderMainCards(data);
        } catch (error) {
            console.error('Error fetching main cards:', error);
        }
    }

    static async fetchAndRenderAltCards() {
        try {
            const response = await fetch('items.json');
            const data = await response.json();
            ProductRenderer.renderAltCards(data);
        } catch (error) {
            console.error('Error fetching alt cards:', error);
        }
    }

    static renderMainCards(data) {
        data.forEach(item => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('cards-slide', 'cards', 'd-flex', 'position-relative', 'py-1', 'gap-3');
            cardElement.innerHTML = ProductRenderer.getMainCardTemplate(item);

            elements.wrapper.appendChild(cardElement);
            elements.contentSlide.appendChild(elements.wrapper);

            const cardImage = cardElement.querySelector('.imic');
            cardImage.addEventListener('click', () => window.location.href = 'item.html');
        });
    }

    static renderAltCards(data) {
        data.forEach(item => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card', 'py-1');
            cardElement.innerHTML = ProductRenderer.getAltCardTemplate(item);

            elements.cardsAlt.appendChild(cardElement);
            elements.contentAlt.appendChild(elements.cardsAlt);
        });
    }

    static getMainCardTemplate(item) {
        return `
        <div class="card" id="${item.id}">
          <div class="position-relative rounded-4 overflow-hidden">
            <i class="fa-regular fa-heart position-absolute end-0 p-2 m-1 text-black bg-white rounded-5 like"></i>
            <img class="imic" src="./${item.image}">
          </div>
          <div class="d-flex align-items-center gap-2 mt-1">
            <span class="px-1">-%60</span>
            <i class="fa-solid fa-bolt cevir"></i>
            <div>
              <i class="fa-solid fa-turkish-lira-sign"></i><span class="ms-1 fiyat">${item.price}</span>
            </div>
          </div>
          <p class="gizle bilgi">${item.info}</p>
          <div class="d-flex card-alt gap-1">
            <div class="d-flex">
              <div class="bg-ver">Satış</div>
              <div class="bg-ver">
                <i class="fa-solid fa-star"></i>4.5/2000+
              </div>
              <div class="bg-ver">
                <i class="fa-solid fa-fire"></i>Çok satanlar
              </div>
            </div>
            <button onclick="CartManager.addToCart(${item.id})" class="btn btn-danger basket-btn w-50 p-0">Sepete Ekle</button>
          </div>
        </div>
      `;
    }

    static getAltCardTemplate(item) {
        return `
        <div class="position-relative rounded-4 overflow-hidden">
          <i class="fa-regular fa-heart position-absolute end-0 p-2 m-1 text-black bg-white rounded-5 like"></i>
          <img src="./${item.image}">
        </div>
        <div class="d-flex align-items-center gap-2 mt-1">
          <span class="px-1">-%60</span>
          <i class="fa-solid fa-bolt cevir"></i>
          <div>
            <i class="fa-solid fa-turkish-lira-sign"></i><span class="ms-1">${item.price}</span>
          </div>
        </div>
        <p class="gizle">${item.info}</p>
        <div class="d-flex card-alt gap-1 align-items-center">
          <div class="bg-ver">Satış</div>
          <div class="bg-ver">
            <i class="fa-solid fa-star"></i>4.5/2000+
          </div>
          <div class="bg-ver">
            <i class="fa-solid fa-fire"></i>Çok satanlar
          </div>
        </div>
      `;
    }
}

// Event Listeners
elements.categoryBtn.addEventListener('click', () => {
    elements.categoryOpen.classList.toggle('d-none');
});

// Navigation
function navigateToCart() {
    window.location.href = 'sepet.html';
}

// Initialize Application
(function initialize() {
    CartManager.initialize();
    ProductRenderer.fetchAndRenderMainCards();
    ProductRenderer.fetchAndRenderAltCards();
})();
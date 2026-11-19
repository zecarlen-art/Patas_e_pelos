let cart = [];

// Inicialização após o carregamento da página
document.addEventListener('DOMContentLoaded', () => {
    // Adiciona evento de clique em todos os botões "Comprar" dos cards
    const buyButtons = document.querySelectorAll('.rayquaza button');
    
    buyButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const card = event.target.closest('.rayquaza');
            
            const title = card.querySelector('h3').innerText;
            const priceText = card.querySelector('span').innerText;
            const imgSrc = card.querySelector('img').getAttribute('src');
            
            // Converte R$500,90 para o número float 500.90
            const price = parseFloat(
                priceText.replace('R$', '').replace('.', '').replace(',', '.').trim()
            );

            addToCart(title, price, imgSrc);
        });
    });
});

// Adiciona produto ao carrinho
function addToCart(title, price, imgSrc) {
    const existingItem = cart.find(item => item.title === title);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ title, price, imgSrc, quantity: 1 });
    }

    updateCartUI();
    openCart();
}

// Atualiza a exibição do carrinho e o cálculo do total
function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotalPrice = document.getElementById('cart-total-price');

    cartItemsContainer.innerHTML = '';

    let totalQuantity = 0;
    let totalPrice = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; color: #777;">Seu carrinho está vazio.</p>';
    } else {
        cart.forEach((item, index) => {
            totalQuantity += item.quantity;
            totalPrice += item.price * item.quantity;

            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <img src="${item.imgSrc}" alt="${item.title}">
                <div class="cart-item-details">
                    <h4>${item.title}</h4>
                    <span class="cart-item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</span>
                    <div class="cart-item-controls">
                        <button onclick="changeQuantity(${index}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQuantity(${index}, 1)">+</button>
                        <button class="cart-item-remove" onclick="removeItem(${index})">Remover</button>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
    }

    cartCount.innerText = totalQuantity;
    cartTotalPrice.innerText = `R$ ${totalPrice.toFixed(2).replace('.', ',')}`;
}

// Altera a quantidade de um item
function changeQuantity(index, delta) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    updateCartUI();
}

// Remove o item do carrinho
function removeItem(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// Abre/Fecha a aba lateral
function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

function openCart() {
    document.getElementById('cart-sidebar').classList.add('active');
    document.getElementById('cart-overlay').classList.add('active');
}

// Ação de finalizar a compra
function checkout() {
    if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }
    alert("Obrigado pela compra! Pedido finalizado com sucesso.");
    cart = [];
    updateCartUI();
    toggleCart();
}
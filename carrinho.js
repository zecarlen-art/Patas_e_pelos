// Carrega o carrinho salvo no navegador ou inicia vazio
let carrinho = JSON.parse(localStorage.getItem('patasPelosCarrinho')) || [];

// Abre ou fecha a barra lateral do carrinho
function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    const statusBox = document.getElementById('pedido-status');

    if (sidebar && overlay) {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('open');
    }

    if (statusBox && sidebar.classList.contains('open')) {
        statusBox.hidden = true;
    }
}

// Adiciona qualquer item (produto ou serviço)
function adicionarAoCarrinho(nome, preco) {
    const itemExistente = carrinho.find(item => item.nome === nome);

    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({
            nome: nome,
            preco: parseFloat(preco),
            quantidade: 1
        });
    }

    salvarEAtualizar();

    const sidebar = document.getElementById('cart-sidebar');
    if (sidebar && !sidebar.classList.contains('open')) {
        toggleCart();
    }
}

// Altera a quantidade (+1 ou -1)
function alterarQuantidade(index, delta) {
    carrinho[index].quantidade += delta;

    if (carrinho[index].quantidade <= 0) {
        carrinho.splice(index, 1);
    }

    salvarEAtualizar();
}

// Remove o item
function removerItem(index) {
    carrinho.splice(index, 1);
    salvarEAtualizar();
}

// Salva e atualiza a interface
function salvarEAtualizar() {
    localStorage.setItem('patasPelosCarrinho', JSON.stringify(carrinho));
    renderizarCarrinho();
}

// Atualiza o contador do topo e a lista da gaveta
function renderizarCarrinho() {
    const cartCount = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');

    const totalItens = carrinho.reduce((soma, item) => soma + item.quantidade, 0);
    if (cartCount) {
        cartCount.textContent = totalItens;
    }

    if (cartItemsContainer && cartTotalPrice) {
        cartItemsContainer.innerHTML = '';
        let valorTotal = 0;

        if (carrinho.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Seu carrinho está vazio no momento 🐾</p>';
            cartTotalPrice.textContent = 'R$ 0,00';
            return;
        }

        carrinho.forEach((item, index) => {
            const subtotal = item.preco * item.quantidade;
            valorTotal += subtotal;

            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item';
            itemEl.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.nome}</h4>
                    <span>R$ ${subtotal.toFixed(2).replace('.', ',')}</span>
                </div>
                <div class="cart-item-controls">
                    <button class="qty-btn" onclick="alterarQuantidade(${index}, -1)">-</button>
                    <strong>${item.quantidade}</strong>
                    <button class="qty-btn" onclick="alterarQuantidade(${index}, 1)">+</button>
                    <button class="remove-btn" onclick="removerItem(${index})" title="Remover">🗑️</button>
                </div>
            `;
            cartItemsContainer.appendChild(itemEl);
        });

        cartTotalPrice.textContent = `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
    }
}

// Botão Confirmar Pedido com forma de pagamento
function confirmarPedido() {
    const statusBox = document.getElementById('pedido-status');
    const selectPagamento = document.getElementById('forma-pagamento');

    if (carrinho.length === 0) {
        alert('Adicione pelo menos um produto ou serviço ao carrinho antes de confirmar o pedido!');
        return;
    }

    const formaPagamento = selectPagamento ? selectPagamento.value : 'Não informada';
    const totalFinal = document.getElementById('cart-total-price').textContent;

    if (statusBox) {
        statusBox.innerHTML = `
            <strong>✅ Pedido Confirmado!</strong><br>
            <strong>Total:</strong> ${totalFinal}<br>
            <strong>Pagamento:</strong> ${formaPagamento}<br>
            Obrigado por escolher a Patas & Pelos!
        `;
        statusBox.hidden = false;
    }

    carrinho = [];
    salvarEAtualizar();
}

document.addEventListener('DOMContentLoaded', renderizarCarrinho);
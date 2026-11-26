
  // --- LÓGICA DO CARROSSEL ---
  const carrossel = document.getElementById('productsCarousel');
  const btnPrev = document.getElementById('btnPrev');
  const btnNext = document.getElementById('btnNext');

  if (carrossel && btnPrev && btnNext) {
    // Rola para a direita (largura do card + espaçamento = ~285px)
    btnNext.addEventListener('click', () => {
      carrossel.scrollBy({ left: 285, behavior: 'smooth' });
    });

    // Rola para a esquerda
    btnPrev.addEventListener('click', () => {
      carrossel.scrollBy({ left: -285, behavior: 'smooth' });
    });
  }

  // --- LÓGICA DO FILTRO DE CATEGORIAS ---
  const vazio = document.getElementById('menuVazio');

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });

      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      const filtro = btn.dataset.filter;
      let visiveis = 0;

      document.querySelectorAll('.menu-item').forEach(item => {
        const esconder = filtro !== 'todos' && item.dataset.cat !== filtro;
        item.classList.toggle('hidden', esconder);
        if (!esconder) visiveis++;
      });

      // Reseta a rolagem do carrossel para o início ao trocar de categoria
      if (carrossel) {
        carrossel.scrollTo({ left: 0, behavior: 'smooth' });
      }

      if (vazio) vazio.hidden = visiveis > 0;
    });
  });

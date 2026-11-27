document.addEventListener('DOMContentLoaded', () => {
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

            if (vazio) {
                vazio.hidden = visiveis > 0;
            }
        });
    });
});
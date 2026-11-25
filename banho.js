document.addEventListener('DOMContentLoaded', () => {
    const selectServico = document.getElementById('servico');
    const selectPorte = document.getElementById('porte');
    const spanValorServico = document.getElementById('valorServico');
    const secaoAgendamento = document.getElementById('agendamento');
    const formAgendamento = document.getElementById('formAgendamento');
    const mensagemConfirmacao = document.getElementById('mensagemConfirmacao');
    const inputData = document.getElementById('data');

    // Tabela de preços fixa para cálculo automático no formulário
    const tabelaPrecos = {
        'banho': { 'pequeno': 45.00, 'medio': 60.00, 'grande': 80.00 },
        'tosa': { 'pequeno': 50.00, 'medio': 65.00, 'grande': 85.00 },
        'banho-e-tosa': { 'pequeno': 85.00, 'medio': 110.00, 'grande': 145.00 },
        'aromaterapia': { 'pequeno': 30.00, 'medio': 35.00, 'grande': 40.00 }
    };

    // Atualiza o valor estimado na tela quando muda o serviço ou o porte
    function atualizarPrecoEstimado() {
        const servico = selectServico.value;
        const porte = selectPorte.value;

        if (tabelaPrecos[servico] && tabelaPrecos[servico][porte]) {
            const preco = tabelaPrecos[servico][porte];
            spanValorServico.textContent = `R$ ${preco.toFixed(2).replace('.', ',')}`;
        }
    }

    if (selectServico && selectPorte) {
        selectServico.addEventListener('change', atualizarPrecoEstimado);
        selectPorte.addEventListener('change', atualizarPrecoEstimado);
    }

    // Impede datas anteriores a hoje no agendamento
    if (inputData) {
        const hoje = new Date().toISOString().split('T')[0];
        inputData.setAttribute('min', hoje);
    }

    // Botão "Agendar este" nos cards rola até o formulário e seleciona o serviço
    document.querySelectorAll('.btn-select-service').forEach(botao => {
        botao.addEventListener('click', () => {
            const servicoEscolhido = botao.dataset.servico;
            if (selectServico && servicoEscolhido) {
                selectServico.value = servicoEscolhido;
                atualizarPrecoEstimado();
            }
            if (secaoAgendamento) {
                secaoAgendamento.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Envio do formulário de agendamento
    if (formAgendamento) {
        formAgendamento.addEventListener('submit', (evento) => {
            evento.preventDefault();

            const tutor = document.getElementById('nome-tutor').value.trim();
            const pet = document.getElementById('nome-pet').value.trim();
            const servicoTexto = selectServico.options[selectServico.selectedIndex].text;
            const porteTexto = selectPorte.options[selectPorte.selectedIndex].text;
            const dataBruta = document.getElementById('data').value;
            const horario = document.getElementById('horario').value;
            const valorFinal = spanValorServico.textContent;

            const partesData = dataBruta.split('-');
            const dataFormatada = `${partesData[2]}/${partesData[1]}/${partesData[0]}`;

            mensagemConfirmacao.innerHTML = `
                <strong>🐾 Agendamento Realizado com Sucesso!</strong><br><br>
                 <strong>Tutor(a):</strong> ${tutor}<br>
                 <strong>Pet:</strong> ${pet}<br>
                 <strong>Serviço:</strong> ${servicoTexto} (${porteTexto})<br>
                 <strong>Data e Hora:</strong> ${dataFormatada} às ${horario}<br>
                 <strong>Valor Estimado:</strong> ${valorFinal}<br><br>
                <small>Entraremos em contato em breve para confirmar o seu horário!</small>
            `;
            mensagemConfirmacao.hidden = false;
            formAgendamento.reset();
            atualizarPrecoEstimado();
        });
    }

    // Inicializa o preço ao carregar
    atualizarPrecoEstimado();
});
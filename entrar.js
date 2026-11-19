// entrar.js - Patas & Pelos

document.addEventListener('DOMContentLoaded', () => {
    // Envio do login
    document.querySelector('#login form').addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Login enviado com sucesso!');
    });
  
    // Envio do cadastro com verificação de senhas
    const senha = document.getElementById('senha-cadastro');
    const confirmar = document.getElementById('confirmar');
  
    document.querySelector('#cadastro form').addEventListener('submit', (e) => {
      e.preventDefault();
  
      if (senha.value !== confirmar.value) {
        confirmar.setCustomValidity('As senhas não coincidem.');
        confirmar.reportValidity();
        return;
      }
      confirmar.setCustomValidity('');
  
      alert('Cadastro enviado com sucesso!');
      e.target.reset();
    });
  
    // Remove a mensagem de erro ao digitar novamente
    confirmar.addEventListener('input', () => confirmar.setCustomValidity(''));
  });
  
  
  
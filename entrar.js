
/* ALTERNAR ENTRE LOGIN E CADASTRO */

function mostrarLogin() {

    document.getElementById("formLogin").classList.remove("escondido");
    document.getElementById("formCadastro").classList.add("escondido");

    document.getElementById("abaLogin").classList.add("ativa");
    document.getElementById("abaCadastro").classList.remove("ativa");

}

function mostrarCadastro() {

    document.getElementById("formCadastro").classList.remove("escondido");
    document.getElementById("formLogin").classList.add("escondido");

    document.getElementById("abaCadastro").classList.add("ativa");
    document.getElementById("abaLogin").classList.remove("ativa");

}

/* LOGIN */

function entrar(event) {

    event.preventDefault();

    alert("Login enviado com sucesso!");

}

/* CADASTRO */

function cadastrar(event) {

    event.preventDefault();

    const senha = document.getElementById("senhaCadastro").value;
    const confirmar = document.getElementById("confirmar");

    if (senha !== confirmar.value) {

        confirmar.setCustomValidity("As senhas não coincidem.");
        confirmar.reportValidity();

        return;
    }

    confirmar.setCustomValidity("");

    alert("Cadastro realizado com sucesso!");

    document.getElementById("formCadastro").reset();

}

/* LIMPAR ERRO DA SENHA */

document.getElementById("confirmar").addEventListener("input", function() {
    this.setCustomValidity("");
});

function validarCadastro() {
    const senha = document.getElementById("senha").value;
    const confirmar = document.getElementById("confirmar").value;

    if (senha !== confirmar) {
        alert("As senhas não são iguais!");
        return false;
    }

    return true;
}

<?php

include "conexao.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $nome = $_POST["nome"];
    $email = $_POST["email"];
    $telefone = $_POST["telefone"];
    $pet = $_POST["pet"];
    $senha = $_POST["senha"];

    $senhaProtegida = password_hash($senha, PASSWORD_DEFAULT);

    try {

        $sql = "INSERT INTO usuarios
                (nome, email, telefone, pet, senha)
                VALUES (?, ?, ?, ?, ?)";

        $comando = $conexao->prepare($sql);

        $comando->execute([
            $nome,
            $email,
            $telefone,
            $pet,
            $senhaProtegida
        ]);

        echo "Cadastro realizado com sucesso!";

    } catch (PDOException $erro) {

        if ($erro->getCode() == "23000") {
            echo "Este e-mail já está cadastrado!";
        } else {
            echo "Erro ao realizar cadastro.";
        }
    }
}

?>
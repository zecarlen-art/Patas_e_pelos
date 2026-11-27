<?php

$host = "localhost";
$banco = "patas_pelos";
$usuario = "root";
$senha = "";

try {
    $conexao = new PDO(
        "mysql:host=$host;dbname=$banco;charset=utf8",
        $usuario,
        $senha
    );

    $conexao->setAttribute(
        PDO::ATTR_ERRMODE,
        PDO::ERRMODE_EXCEPTION
    );

} catch (PDOException $erro) {
    die("Erro na conexão: " . $erro->getMessage());
}

?>
<?php
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);
if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $email = $_POST['email'];
    $message = $_POST['message'];
    $answer = $_POST['answer'];
    if($email != "" && $message != "" && $answer != ""){
        $conn = new mysqli("localhost", "root", "", "LoLinator");
        if($conn -> connect_error){
            exit("Eroare la conectare ". $conn -> connect_error);
        }
        $stmt = $conn -> prepare("INSERT INTO history(email, question, answer) VALUES  (?, ?, ?);");
        $stmt -> bind_param("sss", $email, $message, $answer);
        $stmt -> execute();
        $result = $stmt -> get_result();
        echo "History updated sucessfully.";
    }else{
        echo "Fields empty :(";
    }
}

?>
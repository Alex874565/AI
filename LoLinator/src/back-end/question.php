<?php
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);
if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $email = $_POST['email'] ?? null;
    $message = $_POST['message'] ?? null;
    $answer = $_POST['answer'] ?? null;
    str_replace('\'', '', $message);
    str_replace('\'', '', $answer);
    if($email != "" && $message != "" && $answer != ""){
        $conn = new mysqli("localhost", "root", "", "LoLinator");
        if($conn -> connect_error){
            exit("Eroare la conectare ". $conn -> connect_error);
        }
        $result = $conn -> query("INSERT INTO history(email, question, answer) VALUES  ('$email', '$message', '$answer');");
        echo "History updated sucessfully.";
    }else{
        echo "Fields empty :(";
    }
}

?>
<?php
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $username = $_POST['username'];
    $password = $_POST['password'];
    $email = $_POST['email'];
    if($password != "" && $username != "" && $email != ""){
        $conn = new mysqli("localhost", "root", "", "LoLinator");
        if($conn -> connect_error){
            exit("Eroare la conectare ". $conn -> connect_error);
        }
       $conn -> query("INSERT INTO users (username, email, pass) VALUES ('$username', '$email', '$password');");
       echo "user added";
    }else{
        echo "user not added";
    }
}
?>
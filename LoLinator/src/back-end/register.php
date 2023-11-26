<?php
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);
if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    if($password != "" && $username != "" && $email != ""){
        $conn = new mysqli("localhost", "root", "", "LoLinator");
        if($conn -> connect_error){
            exit("Eroare la conectare ". $conn -> connect_error);
        }
        $result = $conn -> query("SELECT * FROM users WHERE email = '$email';");
        if(mysqli_num_rows($result) == 0){
            $conn -> query("INSERT INTO users (username, email, pass) VALUES ('$username', '$email', '$password');");
            echo "ok";
        }else{
            echo "exists";
        }
    };
}

?>
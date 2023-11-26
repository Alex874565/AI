<?php
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);
if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $email = $_POST['email'];
    $password = $_POST['password'];
    if($password != "" && $email != ""){
        $conn = new mysqli("localhost", "root", "", "LoLinator");
        if($conn -> connect_error){
            exit("Eroare la conectare ". $conn -> connect_error);
        }
        $result = $conn -> query("SELECT username FROM users WHERE email = '$email' and pass = '$password';");
        if(mysqli_num_rows($result) == 0){
            echo "!exists";
        }else{
            $username = mysqli_fetch_array($result);
            echo $username['username'];
        }
    };
}

?>
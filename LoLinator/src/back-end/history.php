<?php
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);
if($_SERVER['REQUEST_METHOD'] == "POST"){
    $email = $_POST['email'];
    $keyword = $_POST['keyword'];
    if($email != ""){
        $conn = new mysqli("localhost", "root", "", "LoLinator");
        if($conn -> connect_error){
            exit("Eroare la conectare " . $conn -> connect_error);
        }
        if($keyword != "undefined"){
            $result = $conn -> query("SELECT question, answer FROM history WHERE email = '$email' AND (question LIKE '%$keyword%' OR answer LIKE '%$keyword%');");
        }else{
            $result = $conn -> query("SELECT question, answer FROM history WHERE email = '$email';");
        }
        echo '
        <table>
            <tr>
                <th> Message </th>
                <th> Answer </th>
            </tr>';
        while($row = $result -> fetch_array()){
            echo '
                <tr>
                    <td>' . $row['question'] . '</td>
                    <td>' . $row['answer'] . '</td>
                </tr>';
        }
        echo '
        </table>
        ';
    }
}
?>

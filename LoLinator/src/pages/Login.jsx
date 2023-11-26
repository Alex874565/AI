import $ from 'jquery';
import { useState } from 'react';
import '../stylesheets/Login.css';

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    async function php_req(){
        var request;
        event.preventDefault();
        if (request){
            request.abort;
        }
        var form = $(this);
        
        var inputs = form.find("input, button");
        
        var serializedData = $("form :input").serialize();
        console.log(serializedData);

        inputs.prop("disabled", true);

        request = await $.ajax({
            url:"http://localhost/LoLinator/login.php",
            type: "post",
            data: serializedData,
            success: (resp) => {
                console.log(resp);
                if (resp != "!exists"){
                    alert("Hello, "+ resp + "!");
                    setUsername(resp);
                    window.location.replace(`home/${resp}/${email}/`)
                }else if (resp == "!exists"){
                    $('#login_errors').text("Wrong email/password.");
                }
            },
            always: (resp) => {
                inputs.prop("disabled", false);
                console.log(resp);
            }
        });
    }

    function letters_nums_test(str){
        return str.match(/[a-z0-9]*/);
    }

    function valid_email_test(str){
        return str.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);
    }

    async function validateForm(){
        $('#login_errors').empty();
        event.preventDefault();
        console.log(email);
        console.log(password);
        if(email == "" || password == ""){
            $('#login_errors').text("All fields must be completed!");
        }else if (!valid_email_test(email) || !letters_nums_test(password)){
            $('#login_errors').text("Please only use numbers and lowercase letters for password and a valid email address.");
        }else if (email.length >= 30 || password.length >= 30){
            $('#login_errors').text("Username or password too long.");
        }else{
            php_req();
        }
    }

    return (
        <div className = "login_body">
        <div id = "login_title">
            Login
        </div>
        <div id = "login_form">
            <form name = "Form" action = "" onSubmit = {validateForm} method = "POST">
                <label htmlFor = "email"><b>Email</b></label>
                <br />
                <input autoComplete = "off" placeholder = "email.adress@example.com" type = "text" name = "email" id = "login_email" onChange={(e) => setEmail(e.target.value)}/>
                <br />
                <br />
                <label htmlFor = "password"><b>Password</b></label> 
                <br />
                <input autoComplete = "off" placeholder = "a-z, 0-9  <30 characters" type = "password" name = "password" id = "login_password" onChange={(e) => setPassword(e.target.value)}/>
                <br />
                <br />
                <button type = "submit">Login</button>            
            </form>
        </div>
        <div id = "login_register">Don't have an account?<br /><button onClick = {() => {window.location.href = '/register';}} >Register</button></div>
        <div id = "login_errors">
        </div>
    </div>
    );
}

export default Login
import '../stylesheets/Register.css';
import { useState } from 'react';
import $ from 'jquery';

function Register(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    
    async function email_validation(){
        var request;
        event.preventDefault();
        if (request){
            request.abort;
        }
        var form = $(this);
        
        var inputs = form.find("input, button");
        
        var serializedData = $("form :input").serialize();

        inputs.prop("disabled", true);

        request = await $.ajax({
            url:"http://localhost/LoLinator/email_validation.php",
            type: "post",
            data: serializedData,
            success: (resp) => {
                if (resp == "exists"){
                    $('#register_errors').text("Email already in use!");
                }else if (resp == "Connect error"){
                    alert("Email does not exist");
                }else{
                    var code = prompt("Please enter the code we sent you on email:")
                    while(code != resp && code != null){
                        code = prompt("Wrong code. Please enter the code again: ");
                    }
                    if(code == resp){
                        php_req();
                    }
                }
                console.log(resp);
            },
            always: (resp) => {
                inputs.prop("disabled", false);
                console.log(resp);
            }
        });
    }

    async function php_req(){
        var request;
        event.preventDefault();
        if (request){
            request.abort;
        }
        var form = $(this);
        
        var inputs = form.find("input, button");
        
        var serializedData = $("form :input").serialize();

        inputs.prop("disabled", true);

        request = await $.ajax({
            url:"http://localhost/LoLinator/register.php",
            type: "post",
            data: serializedData,
            success: (resp) => {
                if (resp == "user added"){
                    alert("User registered successfully!");
                    window.location.replace("./login");
                }
                console.log(resp);
            },
            always: (resp) => {
                inputs.prop("disabled", false);
                console.log(resp);
            }
        });
    }

    async function letters_nums_test(str){
        return await str.match(/^[a-z0-9]*$/);
    }

    function valid_email_test(str){
        return str.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);
    }

    async function validateForm(){
        $('#register_errors').empty();
        event.preventDefault();
        if(email == "" || username == "" || password == ""){
            $('#register_errors').text("All fields must be completed!");
        }else if (!valid_email_test(email)){
            $('#register_errors').text("Make sure you entered a valid email address.");
        }else if(!letters_nums_test(username) || !letters_nums_test(password)){
            $('#register_errors').text("Forbidden characters. Please only use numbers and lowercase letters for email and password.");
        }else if (username.length >= 16 || password.length >= 16){
            $('#register_errors').text("Username or password too long.");
        }else{
            email_validation();
        }
    }
    
    return (
        <div className='register_body'>
        <div id = "register_title">
            Registration
        </div>
        <div id = "register_form">
            <form name = "Form" action = "" onSubmit = {validateForm} method = "POST">
                <label htmlFor = "username"><b>Username</b></label>
                <br />
                <input autoComplete = "off" placeholder = "a-z, 0-9  <30 characters" type = "text" name = "username" id = "register_username" onChange={(e) => setUsername(e.target.value)} />
                <br />
                <br />
                <label htmlFor = "email"><b>Email</b></label>
                <br />
                <input autoComplete = "off" placeholder = "email.address@example.com" type = "text" name = "email" id = "register_email" onChange={(e) => setEmail(e.target.value)} />
                <br />
                <br />
                <label htmlFor = "password"><b>Password</b></label> 
                <br />
                <input autoComplete = "off" placeholder = "a-z, 0-9  <30 characters" type = "password" name = "password" id = "register_password" onChange={(e) => setPassword(e.target.value)}/>
                <br />
                <br />
                <button type = "submit">Register</button>            
            </form>
        </div>
        <div id = "register_errors">
        </div>
    </div>
    )
}

export default Register
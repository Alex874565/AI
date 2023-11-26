import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import $ from 'jquery';
import '../stylesheets/Contact.css';


function Contact(props){

    const { username, email } = useParams();

    function sendMailPhp(e, username, email, text){
        e.preventDefault();
        if(text != undefined && text != ""){

            text=text.replaceAll("'", "");

            var serializedData = `username=${username}&email=${email}&text=${text}`;
            $.ajax({
                url: "http://localhost/LoLinator/email.php",
                type: "post",
                data: serializedData,
                success: (resp) => {console.log(resp); if(resp == "Message has been sent")window.alert("Message sent!");}
            });
        }else{
            window.alert("Field empty!");
        }
    }

    return(
        <div className='contact_body'>
            {Navbar(username, email)}
            <div className='contact_div'>
                Made by: <p className='contact_name'>Alexandru Carpinisan</p> 
                Email: <p className='contact_email'>alex.carpinisan@gmail.com </p>
            </div>
            <form className="contact_form" action="" onSubmit={(e) => {$.ajax(sendMailPhp(e, username, email, $("textarea").val()))}}>
                <textarea placeholder = "Insert question/feedback here and we will reply on mail..."></textarea>
                <br />
                <button type="submit">Send</button>
            </form>
        </div>
    )
}

export default Contact
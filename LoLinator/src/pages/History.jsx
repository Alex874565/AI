import React, { useEffect } from 'react';
import '../stylesheets/History.css';
import Navbar from '../navbar/Navbar';
import $ from 'jquery';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

function History(props){

    let { username, email, keyword } = useParams();

    const [table, setTable] = useState("");

    function changePage(e, keyword){
        e.preventDefault();
        keyword = $("form :input").val();
        if(keyword){
            window.location.replace(`/history/${username}/${email}/${keyword}/`)
        }else{
            window.location.replace(`/history/${username}/${email}/`)
        }
    }

    function getHistory(email, keyword){
        var serializedData = `email=${email}&keyword=${keyword}`;
        $.ajax({
            url:"http://localhost/LoLinator/history.php",
            type:"post",
            data: serializedData,
            success: (resp) => {
                console.log(resp);
                setTable(resp);
            } 
        });

    }

    useEffect(() => {if(keyword != undefined)getHistory(email, keyword.replaceAll("'", "")); else getHistory(email, keyword)}, []);

    return (
        <div className='history_body'>
            {Navbar(username, email)}
            <form className='history_form' action="" onSubmit={(e) => changePage(e,keyword)} method="POST">
                <input placeholder="Search by keyword..." type="text" name="search_bar" id="search_bar" onChange={(e) => {keyword = e.target.value}}></input>
                <button id="search_button" type='submit'><img src="https://cdn.discordapp.com/attachments/991326241321930813/1178306212907991040/magnifying_glass.png?ex=6575aa2d&is=6563352d&hm=a73e3a0146ef310d56032728ff1b06a8767daab07b077c21994f57718bf689b8&"></img></button>
            </form>
            <div className="history_table"dangerouslySetInnerHTML={{__html:table}} />
        </div>
    )
}

export default History
import React from 'react';
import '../stylesheets/Home.css';
import Navbar from '../navbar/Navbar' 
import { useParams } from 'react-router-dom';

function Home(props){
    const { username, email } = useParams();
    return (
    <div className='home_body'>
        {Navbar(username, email)}
        <h3 className="home_overtitle">
            Welcome to
        </h3>
        <h1 className = "home_title">
            LoLinator!
        </h1>
        <h4 className = "home_subtitle">
            Your League of Legends know-it-all AI!
        </h4>
        <img id="lolicon" src="https://cdn.discordapp.com/attachments/991326241321930813/1178056749396262922/lolicon.jfif?ex=6574c1d8&is=65624cd8&hm=b7b27541c2dcfef05de50ce948eb342bcb83c5ce967479cd8f01fc3cf0ef6e7c&"></img>
        <h6>If instead of asking questions, you want to learn by playing, you can download the game on Riot Games' official page: 
            <br />
            <a target="_blank" href="https://signup.leagueoflegends.com/en-us/signup/index#/"><img id="rito_img" src="https://cdn.mos.cms.futurecdn.net/uVBLFSRk3BesJvi2ScPBtP.jpg"></img></a>
        </h6>
    </div>
    );
};
 
export default Home;
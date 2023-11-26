import React from 'react';
import '../stylesheets/Lore.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import LoLinator from '../back-end/LoLinator';
import Navbar from '../navbar/Navbar';
import { useParams } from 'react-router-dom';

function Lore(props) {

  const { username, email } = useParams();

  const systemMessage = {
    "role": "system", "content": "Give answers as a League of Legends lore expert. Please answer all further messages in the context of League of Legends lore."
  }

  const greetMessage = `Hello, ${username}, I am LoLinator, your League of Legends lore expert. What do you want to know?`;

  return (
    <div className="lore_body">
      {Navbar(username, email)}
      <div className='lore_lolinator'>
        {LoLinator(systemMessage, greetMessage, username, email)}
        <p className='lore_p'>The lore expert!</p>
        <img className='lore_img' src="https://cdn.discordapp.com/attachments/991326241321930813/1178069106788925450/lolicon2.jfif?ex=6574cd5a&is=6562585a&hm=51128e74806e36f421d2a3f9e630525b7111d10092fd4cf730470426f17feadb&" />
      </div>
    </div>
  )
}

export default Lore

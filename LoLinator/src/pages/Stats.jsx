import '../stylesheets/Stats.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import Navbar from '../navbar/Navbar';
import LoLinator from '../back-end/LoLinator';
import { useParams } from 'react-router-dom';

function Stats(props) {

  const systemMessage = {
    "role": "system", "content": "Give answers as a League of Legends expert. Please answer all further messages in the context of the champion tier list found on u.gg"
  }

  const { username, email } = useParams();

  const greetMessage = `Hi, ${username}, I'm LoLinator. I can tell you everything you need to know about the current League of Legends meta.`

  return (
    <div className="stats_body">
      {Navbar(username, email)}
      <div className="stats_lolinator">
        {LoLinator(systemMessage, greetMessage, username, email)}
        <p className='stats_p'>The meta analyser</p>
        <img className='stats_img' src="https://cdn.discordapp.com/attachments/991326241321930813/1178069106788925450/lolicon2.jfif?ex=6574cd5a&is=6562585a&hm=51128e74806e36f421d2a3f9e630525b7111d10092fd4cf730470426f17feadb&" />
      </div>
    </div>
  )
}

export default Stats

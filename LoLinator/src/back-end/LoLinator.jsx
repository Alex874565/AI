import { useState } from 'react';
import '../stylesheets/LoLinator.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import '../navbar/Navbar';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import $ from 'jquery';

function LoLinator(systemMessage, greetMessage, username, email) {

  const [messages, setMessages] = useState([
    {
      message: greetMessage,
      sentTime: "just now",
      sender: "LoLinator"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const updateHistory = async(email, message, answer) => {
    var serializedData = `email=${email}&message=${message}&answer=${answer}`;
    await $.ajax({
      url:"http://localhost/LoLinator/question.php",
      method: "post",
      data: serializedData,
      success: (resp) => {console.log(resp)}
    });
  }

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: username,
    };

    const newMessages = [...messages, newMessage];
    
    setMessages(newMessages);

    setIsTyping(true);
    await processMessageToLoLinator(newMessages);
  };

  async function processMessageToLoLinator(chatMessages) {

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "LoLinator") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message}
    });

    function apiRequestBody(systemMessage){
      return ({
        "model": "gpt-3.5-turbo",
        "messages": [
          systemMessage,
          ...apiMessages
        ]
      });
    };

    console.log("Starting fetch...");
    await fetch(import.meta.env.VITE_API, 
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + import.meta.env.VITE_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody(systemMessage))
    }).then((data) => {
      return data.json();
    }).then((data) => {
      setMessages([...chatMessages, {
        message: data.choices[0].message.content,
        sender: "LoLinator"
      }])
      setIsTyping(false);
      console.log("Updating history...");
      updateHistory(email, chatMessages[chatMessages.length - 1].message.replaceAll("'", ""), data.choices[0].message.content.replaceAll("'", ""));
      console.log("History updated!");
    });
    console.log("Fetch successful!");
  }

  return (
    <div className="lolinator_body">
      <MainContainer>
        <ChatContainer>       
          <MessageList
            scrollBehavior="smooth" 
            typingIndicator={isTyping ? <TypingIndicator content="LoLinator is typing" /> : null}
          >
            {messages.map((message, i) => {
              return <Message key={i} model={message}/>
            })}
          </MessageList>
          <MessageInput placeholder="Type message here" onSend={handleSend} />        
        </ChatContainer>
      </MainContainer>
    </div>
  )
}

export default LoLinator
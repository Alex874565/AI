import { useState, useEffect } from 'react'
import './stylesheets/ChatPage.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

const CRACK_API_KEY = "sk-ZmuRd2xT1Pvy4lZXEhVWL2OCMzJOZlV7g71VX3JOcN229ETq";
const CRACK_API = "https://api.chatanywhere.com.cn/v1/chat/completions";
const API_KEY = "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";
const API = "https://api.openai.com/v1/chat/completions";
// "Explain things like you would to a 10 year old learning how to code."

function App() {

  const [stats, setStats] = useState("");

  async function getStats(){

  }

  const systemMessage = { //  Explain things like you're talking to a software professional with 5 years of experience.
    "role": "system", "content": "Give answers as a League of Legends lore expert. Please answer all further messages in the context of the following data: \n"
  }

  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm LoLinator! Ask me anything!",
      sentTime: "just now",
      sender: "LoLinator"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
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

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,
        ...apiMessages
      ]
    }

    await fetch(API, 
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);
      setMessages([...chatMessages, {
        message: data.choices[0].message.content,
        sender: "LoLinator"
      }]);
      setIsTyping(false);
    });
  }

  return (
    <div className="App">
      <div style={{ position:"relative", height: "800px", width: "700px"  }}>
        <MainContainer>
          <ChatContainer>       
            <MessageList 
              scrollBehavior="smooth" 
              typingIndicator={isTyping ? <TypingIndicator content="LoLinator is typing" /> : null}
            >
              {messages.map((message, i) => {
                console.log(message)
                return <Message key={i} model={message} />
              })}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />        
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  )
}

export default App

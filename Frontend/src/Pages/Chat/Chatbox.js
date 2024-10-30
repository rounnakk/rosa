import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import './Chatbox.css';
import { PlaceHolder } from '../../Components/TextAreaInput/PlaceHolder';
import Card from '../../Components/Cards/Card';
import { render } from '@testing-library/react';
import renderCards from '../../Components/Cards/renderCards';
import ReactDOMServer from 'react-dom/server';

const ChatContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: #181818;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Aside = styled.div`
  width: 15%;
  height: 100%;
  position: fixed;
  left: 0;
  background: black;
`;

const Wrapper = styled.div`
  display: flex;
  width: 90%;
  height: 90%;
  margin: 5%;
  flex-direction: column;
  align-items: flex-start;
`;

const SideHeader = styled.div`
  text-align: center;
`;

const MainContainer = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  right: 0;
  display: flex;
  justify-content: center;
`;

const ChatInput = styled.div`
  width: 45%;
  height: auto;
  position: fixed;
  bottom: 25px;
  border-radius: 50px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const ChatArea = styled.ul`
    width: 60%;
    height: 88%;
    overflow-y: auto;
    padding: 50px 20px 10px;
    margin: 0;
    overflow-x: hidden;
`

const typingIndicatorDiv = document.createElement('div');
typingIndicatorDiv.classList.add('typing-indicator', "invisiblee");
typingIndicatorDiv.innerHTML = '<span></span><span></span><span></span>';

let originalMessage

const escapeHtml = (unsafe) => {
  return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
};

let isBotTyping = false;

let ws
 ws = new WebSocket('ws://127.0.0.1:8000/ws');
//new
function connectWebSocket() {
  ws = new WebSocket('ws://127.0.0.1:8000/ws/ws');
}
function formatTextResponse(response) {
//   // Replace line breaks with <br> for HTML rendering
   let formattedText = response.replace(/\n/g, "<br>");
  
   // Replace **text** with <strong>text</strong> for bold styling
   formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
//   // Replace URLs with clickable links
   formattedText = formattedText.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
  
   return formattedText;
 }

// $env:PORT = 4000; npm start



//  function renderCards(data) {
//    try {
//      const json = JSON.parse(data); // Log the parsed JSON

//      if (json.Type === "message") {
//       return json.Message;
//      } else if (json.Type === "products") {
//        // Code to render react component for products will go here
//        const cards = json.Fields.map(item =>{
//          return <Card 
//          item = {item}
//          />
//        })
//        return cards
      
//      } else {
//        console.error("Unknown type received:", json.Type);
//        return "Sorry an unexpected error occured. PLease try again.";
//      }
//    } catch (error) {
//      console.error("Failed to parse JSON data:", error);
//      return "Sorry an unexpected error occured. PLease try again.";
//    }
  
//  }


// formatTextResponse(messageData)

const ChatBox = () => {
  const chatboxRef = useRef(null)

  const handleChatSubmit = (message) => {
    const chatbox = chatboxRef.current;
    originalMessage = message.trim();
    const cleanedMessage = escapeHtml(originalMessage);
    if (!originalMessage) return;

    const showTyping = () => {
      if(isBotTyping) {
          typingIndicatorDiv.style.display = 'flex';
          chatbox.appendChild(typingIndicatorDiv);
          setTimeout(()=>{
              adjustChatboxScroll();
              typingIndicatorDiv.classList.add("visible")
          },200)
      }
      if(!isBotTyping){
          typingIndicatorDiv.style.display = 'none';
          typingIndicatorDiv.classList.remove('visible')
      }
  } 
    
    ws.send(originalMessage)
    
    const adjustChatboxScroll = () => {
      chatbox.scrollTop = chatbox.scrollHeight;
    };


    
    // Append the user's message to the chatbox
    const fragment = document.createDocumentFragment();
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", "invisiblee", "outgoing");
    chatLi.innerHTML = `<p>${cleanedMessage}</p>`;
    fragment.appendChild(chatLi);
    chatbox.appendChild(fragment);
    setTimeout(()=>{
      adjustChatboxScroll()
      chatLi.classList.add("visible")
    },100)
    
    isBotTyping = true;
    showTyping();

    ws.onmessage = function(event){
      
      isBotTyping = false;
      showTyping();
      // Append the user's message to the chatbox
      // const botMessage = formatTextResponse(event.data)
      const botMessage = renderCards(event.data)
      const botMessageHTML = ReactDOMServer.renderToString(botMessage);
      const fragment = document.createDocumentFragment();
      const chatLi = document.createElement("li");
      chatLi.classList.add("chat", "invisiblee", "incoming");
      chatLi.innerHTML = botMessageHTML;
      fragment.appendChild(chatLi);
      chatbox.appendChild(fragment);
      setTimeout(()=>{
        adjustChatboxScroll()
          chatLi.classList.add("visible")
      },100)
    }
      

    ws.onclose = (event) => {
      isBotTyping = false;
      showTyping();
      console.log('WebSocket connection closed. Code:', event.code, 'Reason:', event.reason || 'No reason provided');
      const fragment = document.createDocumentFragment();
      const chatLi = document.createElement("li");
      chatLi.classList.add("chat", "invisiblee", "incoming");
      chatLi.innerHTML = `<p>An unexpected error occurred, please try again.</p>`;
      fragment.appendChild(chatLi);
      chatbox.appendChild(fragment);  
      setTimeout(() => {
          adjustChatboxScroll();
          chatLi.classList.add("visible");
      }, 100);
      // Attempt to reconnect after a delay
      setTimeout(() => {
          console.log('Reconnecting WebSocket...');
          connectWebSocket();
      }, 5000);
    };

    ws.onerror = (error) => {
      isBotTyping = false;
      showTyping();
      console.error('WebSocket error:', error);
      const fragment = document.createDocumentFragment();
      const chatLi = document.createElement("li");
      chatLi.classList.add("chat", "invisiblee", "incoming");
      chatLi.innerHTML = `<p>An unexpected error occurred, please try again.</p>`;
      fragment.appendChild(chatLi);
      chatbox.appendChild(fragment);  
      setTimeout(() => {
          adjustChatboxScroll();
          chatLi.classList.add("visible");
      }, 100);
      setTimeout(() => {
          console.log('Reconnecting WebSocket...');
          connectWebSocket();
      }, 5000);
    };

  };

  //   textarea.addEventListener('input', () => {
  //     // Set the height to auto temporarily to get the full scrollHeight
  //     textarea.style.height = 'auto' - 60;
  //     textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`; // Limit max height to 300px or adjust as needed
  //     if(textarea.value === ''){
  //       textarea.style.height = `${inputInitHeight}px`;
  //     }
  //   });

    // // Event listener for Enter key press in textarea
    // textarea.addEventListener('keydown', (e) => {
    //   if (e.key === 'Enter' && !e.shiftKey && window.innerWidth > 800) {
    //     e.preventDefault();
    //     chatinput.classList.remove('border-radius')
    //     handleChat();
    //   }
    // });

    // textarea.addEventListener('keydown', (e)=>{
    //   if(e.key === 'Enter' && e.shiftKey){
    //     chatinput.classList.add('border-radius')
    //   }
    // })

  // }, []);

  return (
    <ChatContainer>
      
      {/* <Aside>
        <Wrapper>
          <SideHeader>
            <h3 style={{ margin: 0 }}>Rosa AI</h3>
          </SideHeader>
        </Wrapper>
      </Aside> */}
      <MainContainer>
        <ChatArea className='chatbox' ref={chatboxRef}>

        </ChatArea>
        <ChatInput className='chatinput'>
          <span style={{width:'100%'}}> 
        <PlaceHolder handleChatSubmit={handleChatSubmit}/>
        </span>
        </ChatInput>
      </MainContainer>
    </ChatContainer>
  );
};

export default ChatBox;
 /*
<textarea
  ref={textareaRef}
  id="chatInput"
  maxLength={500}
  required
  placeholder="Enter a message..."
  spellCheck
  className="text-input"
></textarea>
 <img className='send-btn' src='./send.png'/> 
<svg
  className="send-btn bi bi-send"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  fill="currentColor"
  viewBox="0 0 16 16"
>
  <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
</svg>

*/
import React, { useEffect, useState } from 'react';
import Chatbot from 'react-chatbot-kit';
import config from './config';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import theme from 'theme';
import './styles.css';
import ChatbotHeader from './Components/Header';
import ChatProvider from './ChatContext';
const ChatbotComponent = () => {

  const validator = (message) => {
    if (!message || message.length < 3 ) {
          return false;
    }
    return true;
  }

  return (
    <ChatProvider>
      <ChatbotHeader />
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
        headerText='En que podemos ayudarle?'
        placeholderText='Escriba su mensaje...'
        validator={validator}
      />  
    </ChatProvider>  
  );
};

export default ChatbotComponent;
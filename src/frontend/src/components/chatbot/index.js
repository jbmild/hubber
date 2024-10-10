import React, { useEffect, useState } from 'react';
import Chatbot from 'react-chatbot-kit';
import config from './config';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import theme from 'theme';
import './styles.css';

const ChatbotComponent = () => {

  const validator = (message) => {
    if (!message || message.length < 3 ) {
          return false;
    }
    return true;
  }

  return (    
    <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
        headerText='En que podemos ayudarle?'
        placeholderText='Escriba su mensaje...'
        validator={validator}
    />    
  );
};

export default ChatbotComponent;
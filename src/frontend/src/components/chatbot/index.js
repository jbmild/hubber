import React from 'react';
import Chatbot from 'react-chatbot-kit';
import config from './config';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import theme from 'theme';
import './styles.css';

const ChatbotComponent = () => {
  return (    
    <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
        headerText='En que podemos ayudarle?'
    />    
  );
};

export default ChatbotComponent;
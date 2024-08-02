import { createChatBotMessage } from 'react-chatbot-kit';

const botName = 'BOTSITO';

const config = {
  initialMessages: [createChatBotMessage(`Hola soy ${botName}, ¿cómo puedo ayudarte hoy?`)],
  botName: botName,
  
};

export default config;
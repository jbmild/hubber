import { createChatBotMessage } from 'react-chatbot-kit';
import GeneralOptions from './OptionSelector/GeneralOptions';

const botName = 'BOTSITO';

const config = {
  initialMessages: [
    createChatBotMessage(`Hola soy ${botName}, ¿cómo puedo ayudarte hoy?`),
    createChatBotMessage('Acá hay posibles opciones de conversación.',
      {
        widget: "options",
        delay: 500,
        withAvatar: true,
      }
    )
  ],
  botName: botName,
  lang: 'es',
  state: {
  },
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <GeneralOptions {...props} />,     
      mapStateToProps: ["messages"],
    },
  ]
};

export default config;
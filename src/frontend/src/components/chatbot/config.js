import { createChatBotMessage } from 'react-chatbot-kit';
import GeneralOptions from './OptionSelector/GeneralOptions';
import PaisesOptions from './OptionSelector/PaisSelector';

const botName = 'Hubber';

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
      mapStateToProps: ["messages", 'normativasBasicas'],
    },
    {
      widgetName: "paises",
      widgetFunc: (props) => <PaisesOptions {...props} />,     
      mapStateToProps: ["messages", "paisSeleccionado"],
    },
  ]
};

export default config;
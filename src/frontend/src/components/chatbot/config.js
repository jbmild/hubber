import { createChatBotMessage } from 'react-chatbot-kit';
import GeneralOptions from './OptionSelector/GeneralOptions';
import PaisesOptions from './OptionSelector/PaisSelector';
import { getUser } from 'services/authService';
import BackgroundLetterAvatars from 'components/avatarColor';

const botName = 'Hubber';
const username = (await getUser()).username;

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
    {
      widgetName: "paises",
      widgetFunc: (props) => <PaisesOptions {...props} />,     
      mapStateToProps: ["messages"],
    },
  ]
  /*,
  customComponents:{
    userAvatar: <BackgroundLetterAvatars name={username} hasAlerts={false} />
  }*/
};

export default config;
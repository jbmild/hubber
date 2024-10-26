import { createChatBotMessage } from 'react-chatbot-kit';
import GeneralOptions from './OptionSelector/GeneralOptions';
import PaisesOptions from './OptionSelector/PaisSelector';
import IconoUsuario from './Components/UserIcon';
import IconoBot from './Components/BotIcon';
import {ChatbotHeaderVacio} from './Components/Header';

export const botName = 'HubberBot';


const config = {
  initialMessages: [
    createChatBotMessage(`Hola soy ${botName}, ¿cómo puedo ayudarte hoy?`),
    createChatBotMessage('Seleccione una opcion para saber en que podemos guiarlo.',
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
  ],
  customComponents:{
    header: () => <ChatbotHeaderVacio />,
    userAvatar: (props) => <IconoUsuario />,
    botAvatar: (props) => <IconoBot />
  }
};

export default config;
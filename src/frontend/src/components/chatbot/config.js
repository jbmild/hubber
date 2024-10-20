import { createChatBotMessage } from 'react-chatbot-kit';
import GeneralOptions from './OptionSelector/GeneralOptions';
import PaisesOptions from './OptionSelector/PaisSelector';
import IconoUsuario from './Components/UserIcon';

const botName = 'HubberBot';

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
    userAvatar: (props) => <IconoUsuario />
  }
};

export default config;
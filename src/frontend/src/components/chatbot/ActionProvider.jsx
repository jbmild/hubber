import React, { useEffect, useState } from 'react';
import { sendMessage } from 'services/chatbotService';
import Loader from './loader';

const ActionProvider = ({ createChatBotMessage, setState, children}) => {

  const [optionsState, setOptionsState] = useState({
    normativasBasicas: null,
    paisSeleccionado: null
  });

  const [bloquear, setBloquear] = useState(true);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const input = Array.from(document.getElementsByClassName("react-chatbot-kit-chat-input"))[0];
    const button = Array.from(document.getElementsByClassName("react-chatbot-kit-chat-btn-send"))[0];

    input.setAttribute('disabled', 'true');
    button.setAttribute('disabled', 'true');
  }, []);

  useEffect(() => {

    if(optionsState.normativasBasicas != null){
      const input = Array.from(document.getElementsByClassName("react-chatbot-kit-chat-input"))[0];
      const button = Array.from(document.getElementsByClassName("react-chatbot-kit-chat-btn-send"))[0];

      if(optionsState.normativasBasicas){
        input.removeAttribute('disabled');
        button.removeAttribute('disabled');
        setBloquear(false);
      }else if(optionsState.paisSeleccionado){
        input.removeAttribute('disabled');
        button.removeAttribute('disabled');
        setBloquear(false);        
      }
    }
  }, [optionsState]);


  useEffect(() => {
    if(!bloquear){
      const input = Array.from(document.getElementsByClassName("react-chatbot-kit-chat-input"))[0];
      const button = Array.from(document.getElementsByClassName("react-chatbot-kit-chat-btn-send"))[0];

      if(loading){
        input.setAttribute('disabled', 'true');
        button.setAttribute('disabled', 'true');
      } else{
        input.removeAttribute('disabled');
        button.removeAttribute('disabled');
      }
    }
  }, [loading])

  const opcionesBasicasMessage = {
    withAvatar: true,
    loading: true,
    terminateLoading: true,
  };
  
  const addMessageToState = (message) => {
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };

  const handleSubmit = (message) => {

    setLoading(true);
    const loadingMsg = createChatBotMessage(<Loader />)
    setState((prev) => ({ ...prev, messages: [...prev.messages, loadingMsg], }))


    sendMessage(message).then((response) => {
      setLoading(false);


      const chatbotMessage = createChatBotMessage(response, opcionesBasicasMessage
      );

      setState((prev) => {
        const newPrevMsg = prev.messages.slice(0, -1)
        return { ...prev, messages: [...newPrevMsg, chatbotMessage], }
      })
    });
  }

  
  const handlePais = (params) => {
    const message = createChatBotMessage('Seleccione un pais',
      {        
        ...opcionesBasicasMessage,
        widget: 'paises'
      }
    );

    addMessageToState(message);

    setOptionsState((prev) => ({
      ...prev,
      normativasBasicas: false
    }));
  }

  const handlePaisSeleccionado = (params) => {
    const message = createChatBotMessage(`Quieres exportar a ${params.pais}, en que podemos guiarle?`,
      opcionesBasicasMessage
    );

    addMessageToState(message);

    setOptionsState((prev) => ({
      ...prev,
      paisSeleccionado: params.pais,
    }));
  }

  const handleNormativasBasicas = (params) => {
    const message = createChatBotMessage('Se le guiara por normaticas basicas, en que podemos guiarle?',
      opcionesBasicasMessage
    );

    addMessageToState(message);

    setOptionsState((prev) => ({
      ...prev,
      normativasBasicas: true
    }));
  }
  

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleSubmit,
            handlePais,
            handleNormativasBasicas,
            handlePaisSeleccionado
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
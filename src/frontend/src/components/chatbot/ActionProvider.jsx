import React, { useEffect, useState } from 'react';
import { sendMessage, setGuiaComoExportar, setPais } from 'services/chatbotService';
import Loader from './loader';
import { getPaises } from 'services/paisesService';

const ActionProvider = ({ createChatBotMessage, setState, children}) => {

  const [optionsState, setOptionsState] = useState({
    normativasBasicas: null,
    paisSeleccionado: null,
    paisesAyuda: []
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

      input.removeAttribute('disabled');
      button.removeAttribute('disabled');
      setBloquear(false);        
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

    if(optionsState.normativasBasicas || optionsState.paisSeleccionado){
      const chatKey = optionsState.normativasBasicas ? 'comoExportar' : optionsState.paisSeleccionado;

      sendMessage(message, chatKey).then((response) => {
        setLoading(false);
  
  
        const chatbotMessage = createChatBotMessage(response, opcionesBasicasMessage
        );
  
        setState((prev) => {
          const newPrevMsg = prev.messages.slice(0, -1)
          return { ...prev, messages: [...newPrevMsg, chatbotMessage], }
        })
      });
    }else {
      if(message.toLowerCase().includes('ayuda') || message.toLowerCase().includes('mas opciones')){
          getPaises().then((response) => {
            setLoading(false);
            const paises = response.map(p => (p.pais));
            setOptionsState((prev) => ({
              ...prev,
              paisesAyuda: paises
            }));
        
            const chatbotMessage = createChatBotMessage(`Estos son los paises disponibles actualmente en nuestra base de conocicmiento:\n${paises.join(', ')}.\n Ingrese alguno para poder guiarlo.`, opcionesBasicasMessage
            );
      
            setState((prev) => {
              const newPrevMsg = prev.messages.slice(0, -1)
              return { ...prev, messages: [...newPrevMsg, chatbotMessage], }
            })
        });
      }else if(optionsState.paisesAyuda.length > 0){
        const pais = getPaisNormalizado(message, optionsState.paisesAyuda)
        if(pais){
          setPais(pais).then((response => {
            setLoading(false);
            
            const chatbotMessage = createChatBotMessage(response,
              opcionesBasicasMessage
            );
        
            setState((prev) => {
              const newPrevMsg = prev.messages.slice(0, -1)
              return { ...prev, messages: [...newPrevMsg, chatbotMessage], }
            })
        
            setOptionsState((prev) => ({
              ...prev,
              paisSeleccionado: pais,
            }));
          }));
        }else{
          setLoading(false);
      
          const chatbotMessage = createChatBotMessage('Por favor ingrese un país valido',
            opcionesBasicasMessage
          );

          setState((prev) => {
            const newPrevMsg = prev.messages.slice(0, -1)
            return { ...prev, messages: [...newPrevMsg, chatbotMessage], }
          })
        }
      }else{
        setLoading(false);
      
        const chatbotMessage = createChatBotMessage('Por favor ingrese un país valido',
          opcionesBasicasMessage
        );

        setState((prev) => {
          const newPrevMsg = prev.messages.slice(0, -1)
          return { ...prev, messages: [...newPrevMsg, chatbotMessage], }
        })
      }
    }    
  }

  
  const handlePais = (params) => {
    const message = createChatBotMessage('Ingrese un país, aqui tiene algunas sugerencias, si necesitas más opciones puedes escribir "ayuda" en el chat',
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
    setLoading(true);
    const loadingMsg = createChatBotMessage(<Loader />)
    setState((prev) => ({ ...prev, messages: [...prev.messages, loadingMsg], }))

    setPais(params.pais).then((response => {
      setLoading(false);
      
      const chatbotMessage = createChatBotMessage(response,
        opcionesBasicasMessage
      );
  
      setState((prev) => {
        const newPrevMsg = prev.messages.slice(0, -1)
        return { ...prev, messages: [...newPrevMsg, chatbotMessage], }
      })
  
      setOptionsState((prev) => ({
        ...prev,
        paisSeleccionado: params.pais,
      }));
    }));
  }

  const handleNormativasBasicas = (params) => {
    setLoading(true);
    const loadingMsg = createChatBotMessage(<Loader />)
    setState((prev) => ({ ...prev, messages: [...prev.messages, loadingMsg], }))

    setGuiaComoExportar().then((response => {
      setLoading(false);
      
      const chatbotMessage = createChatBotMessage(response,
        opcionesBasicasMessage
      );
  
      setState((prev) => {
        const newPrevMsg = prev.messages.slice(0, -1)
        return { ...prev, messages: [...newPrevMsg, chatbotMessage], }
      })
  
      setOptionsState((prev) => ({
        ...prev,
        normativasBasicas: true
      }));
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

const normalizeString = (str) => {
  return str
    .normalize('NFD') // Descomponer caracteres acentuados
    .replace(/[\u0300-\u036f]/g, "") // Eliminar acentos
    .toLowerCase(); // Convertir a minúsculas
};

const getPaisNormalizado = (input, lista = []) => {
  if(lista.length == 0)
    return null;

  const normalizedInput = normalizeString(input);
  return lista.find(pais =>
    normalizeString(pais).includes(normalizedInput)
  );
};
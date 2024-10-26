import React, { useEffect, useState } from 'react';
import { sendMessage, setGuiaComoExportar, setPais } from 'services/chatbotService';
import Loader from './loader';
import { getPaises } from 'services/paisesService';
import {useChat} from './ChatContext';

const ActionProvider = ({ createChatBotMessage, setState, children}) => {
  const { reset, triggerReset } = useChat();

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

  useEffect(() => {
    if (reset) {
      resetChat();
    }
  }, [reset]);

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

    if(message.toLowerCase() == 'reset' || message.toLowerCase() == 'refrescar' || message.toLowerCase() == 'reiniciar'){
      resetChat();
      return;
    }

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
        setLoading(false);
        const chatbotMessage = createChatBotMessage(`Estos son los paises disponibles actualmente en nuestra base de conocicmiento:\n${optionsState.paisesAyuda.join(', ')}.\n Ingrese alguno para poder guiarlo.`, opcionesBasicasMessage);

        setState((prev) => {
          const newPrevMsg = prev.messages.slice(0, -1)
          return { ...prev, messages: [...newPrevMsg, chatbotMessage], }
        })
      }else{
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
      }
    }
  }

  
  const handlePais = (params) => {
    const message = createChatBotMessage('A que país deseas exportar?, si necesitas más opciones puedes escribir "ayuda" en el chat',
      {        
        ...opcionesBasicasMessage,
        widget: 'paises'
      }
    );

    if(optionsState.paisesAyuda.length == 0){
      getPaises().then((response => {
        const paises = response.map(p => (p.pais));
        setOptionsState((prev) => ({
          ...prev,
          paisesAyuda: paises
        }));
      })) ;
    }

    addMessageToState(message);

    setOptionsState((prev) => ({
      ...prev,
      normativasBasicas: false
    }));
  }

  const handlePaisSeleccionado = (params) => {
    const pais = getPaisNombreCompleto(params.pais);

    setLoading(true);
    const loadingMsg = createChatBotMessage(<Loader />)
    setState((prev) => ({ ...prev, messages: [...prev.messages, loadingMsg], }))

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
        paisSeleccionado: params.pais,
      }));
    }));
  }

  const handleMasOpcionesPais = (params) => {
    setLoading(true);
    const loadingMsg = createChatBotMessage(<Loader />)
    setState((prev) => ({ ...prev, messages: [...prev.messages, loadingMsg], }))

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
  
  const resetChat = () => {
    const initialMessage = createChatBotMessage('Seleccione una opcion para saber en que podemos guiarlo.',
      {
        widget: "options",
        delay: 500,
        withAvatar: true,
      }
    );

    setOptionsState(prev => ({
      ...prev,
      normativasBasicas: null,
      paisSeleccionado: null
    }));
    
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, initialMessage]
    }))
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleSubmit,
            handlePais,
            handleNormativasBasicas,
            handlePaisSeleccionado,
            handleMasOpcionesPais,
            resetChat
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

const getPaisNormalizado = (input, lista) => {
  if(lista.length == 0){
    return null;
  }

  const normalizedInput = normalizeString(getPaisNombreCompleto(input));
  return lista.find(pais =>
    normalizeString(pais).includes(normalizedInput)
  );
};

const getPaisNombreCompleto = (input) => {
  switch(input){
    case 'Estados Unidos':
    case 'estados unidos':
    case 'EEUU': {return 'Estados Unidos de América'; break;}
    case 'Venezuela':
    case 'República Bolivariana de Venezuela': {return 'Venezuela (República Bolivariana de Venezuela)'; break;}
    default: return input;
  }
}
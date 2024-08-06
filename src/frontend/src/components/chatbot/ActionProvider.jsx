import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  
  const addMessageToState = (message) => {
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };

  
  const handlePais = (params) => {
    const message = createChatBotMessage('Seleccione un pais',
      {        
        withAvatar: true,
        widget: 'paises'
      }
    );

    addMessageToState(message)
  }

  const handlePaisSeleccionado = (params) => {
    const message = createChatBotMessage(`Selecciono: ${params.pais}`,
      {        
        withAvatar: true,
      }
    );

    addMessageToState(message)
  }

  const handleNormativasBasicas = (params) => {
    const message = createChatBotMessage('Se le guiara por normaticas basicas',
      {        
        withAvatar: true,
      }
    );

    addMessageToState(message)
  }
  

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
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
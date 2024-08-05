import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  
  const addMessageToState = (message) => {
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };

  
  const handlePais = () => {
    const message = createChatBotMessage('Seleccione un pais',
      {        
        withAvatar: true,
      }
    );

    addMessageToState(message)
  }

  const handleNormativasBasicas = () => {
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
            handleNormativasBasicas
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
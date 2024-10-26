import React, { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [reset, setReset] = useState(false);

  const triggerReset = () => {
    setReset(prev => !prev);
  };

  return (
    <ChatContext.Provider value={{ reset, triggerReset }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);

export default ChatProvider;
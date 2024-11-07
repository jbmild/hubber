import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { getUser } from 'services/authService';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [reset, setReset] = useState(false);
  const [user, setUser] = useState('');

  useEffect(() =>{
      getUser().then(user => {
        setUser(user.username);
      });
  }, []);

  const triggerReset = () => {
    setReset(prev => !prev);
  };

  return (
    <ChatContext.Provider value={{ reset, triggerReset, user }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);

export default ChatProvider;
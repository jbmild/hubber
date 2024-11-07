import { useEffect, useState } from 'react';
import { Avatar, Badge } from '@mui/material';
import { getUser } from 'services/authService';
import { useChat } from 'components/chatbot/ChatContext';

function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  function stringAvatar(name) {

    try {
      const children = name.split(' ')[0][0]+''+(name.split(' ')[1]?.at(0) ?? '');
      const color = stringToColor(name);
      return {
        sx: {
          bgcolor: color,
          fontSize: '18px',
          lineHeight: '1.6',
          textTransform: 'uppercase'
        },
        children: children,
      };
    } catch {
      return  {}
    }
  }

export default function IconoUsuario() {
    const {user} = useChat();

    return (<Avatar {...stringAvatar(user)} />)
}
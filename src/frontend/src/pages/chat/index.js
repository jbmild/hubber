import { Box } from '@mui/material';
import ChatbotComponent from 'components/chatbot';
import * as React from 'react';
import { useEffect } from 'react';
import theme from 'theme';
import { Paper } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { isAuthenticated } from 'services/authService';
import { clearChatSession } from 'services/chatbotService';

function Chat() {
/*    const location = useLocation();

    useEffect(() => {
      const clearSession = async () => {
        isAuthenticated().then((auth) => {
            debugger;
            if(auth){
                clearChatSession();
            }
        });
      }
  
      clearSession();
    }, [location.pathname]);
  */

    return (
        <Box 
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '70vh',
                backgroundColor: theme.palette.secondary.default,
            }
        }>
            <Paper
                className='chatbot-custom-container'
                elevation={3}
                sx={{
                    width: '50%',
                    height: '85%',
                    maxHeight: '75%',
                    maxWidth: '100%',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <ChatbotComponent/>
            </Paper>
        </Box>
    );
}

export default Chat;
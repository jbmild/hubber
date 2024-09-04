import { Box } from '@mui/material';
import ChatbotComponent from 'components/chatbot';
import * as React from 'react';
import theme from 'theme';
import { Paper } from '@mui/material';

function Chat() {
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
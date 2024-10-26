import React from "react";
import RefreshIcon from '@mui/icons-material/Refresh';
import { Button } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import { useChat } from '../../ChatContext';

import './style.css';

export function ChatbotHeaderVacio () {
    return (
        <div></div>
    );    
}

export default function ChatbotHeader() {
    const { triggerReset } = useChat();

    return (
        <div className="react-chatbot-kit-chat-header">
            <div className="header-container">
                <span>En que podemos ayudarle?</span>
                <Tooltip title='Refrescar chat'>
                    <Button onClick={triggerReset}>
                        <RefreshIcon />
                    </Button>
                </Tooltip>
            </div>
        </div>        
    );
}
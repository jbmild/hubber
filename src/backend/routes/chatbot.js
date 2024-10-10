const { handleSetPais, handlePostMessage, handleClearMessageHistory, handleSetComoExportar } = require("../handlers/chatbotHandler");
const { initChatContext } = require('../middleware/chatbotMiddleware');
const { isAuthenticated } = require('../middleware/authMiddleware');

module.exports = function (app) {
    app.post(
        '/chatbot/pais',
        isAuthenticated,
        handleSetPais
    );

    app.post(
        '/chatbot/guia',
        isAuthenticated,
        handleSetComoExportar
    );

      
    app.post(
        '/chatbot/message',
        isAuthenticated,
        initChatContext,
        handlePostMessage
    );

    app.post(
        '/chatbot/clear',
        isAuthenticated,
        handleClearMessageHistory
    )
}

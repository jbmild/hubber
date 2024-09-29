const { handleSetPais, handlePostMessage } = require("../handlers/chatbotHandler");
const { initChatContext } = require('../middleware/chatbotMiddleware');
const { isAuthenticated } = require('../middleware/authMiddleware');

module.exports = function (app) {
    app.post(
        '/chatbot/pais',
        isAuthenticated,
        handleSetPais
    );
      
    app.post(
        '/chatbot/message',
        isAuthenticated,
        initChatContext,
        handlePostMessage
    );
}

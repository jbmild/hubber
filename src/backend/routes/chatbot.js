const { handleSetPais, handlePostMessage } = require("../handlers/normativasHandler");


module.exports = function (app) {
    app.post(
        '/chatbot/pais',
        handleSetPais
    );
      
    app.post(
        '/chatbot/message', 
        handlePostMessage
    );
}

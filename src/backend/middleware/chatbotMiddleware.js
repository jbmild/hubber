exports.initChatContext = (req, res, next) => {
    if (!req.session.chatContext) {
        req.session.chatContext = ''; // Inicializa el contexto si no existe
    }
    next();
};
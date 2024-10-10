const { getSugerenciasHandler, getSugerenciaHandler } = require("../handlers/sugerencias")

module.exports = function (app) {
    const ensureAuthenticated = (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        res.status(401).json({ error: 'Not authenticated' });
    };

    app.get('/sugerencias', ensureAuthenticated, async (req, res) => {
        return await getSugerenciasHandler(req, res)
    });

    app.get('/sugerencia', ensureAuthenticated, async (req, res) => {
        return await getSugerenciaHandler(req, res)
    });
}
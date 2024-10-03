const { getSugerenciasHandler } = require("../handlers/sugerencias")

module.exports = function (app) {
    const ensureAuthenticated = (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        res.status(401).json({ error: 'Not authenticated' });
    };

    app.get('/sugerencias', async (req, res) => {
        return await getSugerenciasHandler(req, res)
    });
}
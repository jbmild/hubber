const { validate } = require('../middleware/validationMiddleware')
const { createValidator } = require("../validators/users")
const { createUserHandler } = require("../handlers/users")
const User = require('../models/users');

module.exports = function (app) {
    app.post(
        '/users/create',
        validate(createValidator),
        createUserHandler
    );


    const ensureAuthenticated = (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        res.status(401).json({ error: 'Not authenticated' });
    };

    app.get('/users/normativas-usuario', ensureAuthenticated, async (req, res) => {
        try {
            const user = await User.findById(req.user._id).populate('normativasUsuario.idNormativa');
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user.normativasUsuario);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    });

}
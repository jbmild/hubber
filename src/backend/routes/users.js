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

    app.post('/users/normativas-usuario/:id/status', ensureAuthenticated, async (req, res) => {
        const normativaId = req.params.id;
        const { status } = req.body; // Status can be either "Pendiente" or "Aprobado"
        const userId = req.user._id;

        // Validate status
        if (!['Pendiente', 'Aprobado'].includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status' });
        }

        try {
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }

            // Check if normativa already exists in user's normativasUsuario array
            const normativaIndex = user.normativasUsuario.findIndex(n => n.idNormativa.toString() === normativaId);

            if (normativaIndex !== -1) {
                // Normativa exists, update the status
                user.normativasUsuario[normativaIndex].status = status;
                if (status === 'Aprobado') {
                    user.normativasUsuario[normativaIndex].fechaAprobacion = new Date();
                }
            } else {
                // Normativa doesn't exist, add new normativa to the array
                user.normativasUsuario.push({
                    idNormativa: normativaId,
                    status: status,
                    fechaAprobacion: status === 'Aprobado' ? new Date() : undefined
                });
            }

            // Save the updated user
            await user.save();

            res.json({ success: true, message: `Normativa marked as ${status}`, normativasUsuario: user.normativasUsuario });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error updating normativa status', error });
        }
    });

    app.get('/users/me', ensureAuthenticated, async (req, res) => {
        try {
            const user = await User.findById(req.user._id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user.username);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    });
}
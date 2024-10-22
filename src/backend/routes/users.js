const { validate } = require('../middleware/validationMiddleware')
const { createValidator } = require("../validators/users")
const { createUserHandler } = require("../handlers/users")
const User = require('../models/users');
const Notificacion = require('../models/notificaciones');

module.exports = function (app) {
    app.post(
        '/users/create',
        validate(createValidator),
        createUserHandler
    );


    const ensureAuthenticated = (req, res, next) => {
        console.log(req.isAuthenticated());
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
        if(status == null){
            try {
                const user = await User.findById(userId);
                if (!user) {
                    return res.status(404).json({ success: false, message: 'User not found' });
                }
                const normativaIndex = user.normativasUsuario.findIndex(n => n.idNormativa.toString() === normativaId);
                user.normativasUsuario.splice(normativaIndex, 1);
                await user.save();

                return res.json({ success: true, message: `Se dejo de seguir la normativa`, normativasUsuario: user.normativasUsuario });
            }
            catch (error) {res.status(500).json({ success: false, message: 'Error updating normativa status', error })};
        }
        else if (!['Pendiente', 'Aprobado'].includes(status)) {
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
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    app.get('/users/notificaciones-usuario', ensureAuthenticated, async (req, res) => {
        try {
            const notificaciones = await Notificacion.find({$and: [{email : req.user.email}, {estado: { $ne : "Eliminada"}}]})
            .sort({estado: -1});
            res.json(notificaciones);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    app.post('/users/interesPais', ensureAuthenticated, async (req, res) => {
        console.log(req.body);
        try {
        const { interes } = req.body;
        const userAct = await User.findByIdAndUpdate(
            req.user._id,
            { $set: { paises_interes: interes } },
            { new: true }
        );
    
        if (!userAct) {
            return res.status(404).json({ message: 'Usuario no encontrada' });
        }
    
        res.json(userAct);
        } catch (error) {
        res.status(500).json({ message: 'Error al actualizar los intereses', error });
        }
    });

    app.post('/users/interesProducto', ensureAuthenticated, async (req, res) => {
        try {
        const { interes } = req.body;
        const userAct = await User.findByIdAndUpdate(
            req.user._id,
            { $set: { productos_interes: interes } }
        );
    
        if (!userAct) {
            return res.status(404).json({ message: 'Usuario no encontrada' });
        }
    
        res.json(userAct);
        } catch (error) {
        res.status(500).json({ message: 'Error al actualizar los intereses', error });
        }
    });
}
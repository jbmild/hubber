const Notificacion = require("../models/notificaciones");

module.exports = function (app){
    app.put('/notificaciones/:id', async (req, res) => {
        try {
        const notificacionId = req.params.id;
        const { estado } = req.body; // Asumimos que el nuevo valor de "estado" viene en el cuerpo del request
    
        const notifAct = await Notificacion.findByIdAndUpdate(
            notificacionId,
            { $set: { estado: estado } },
            { new: true } // `new: true` para devolver el documento actualizado
        );
    
        if (!notifAct) {
            return res.status(404).json({ message: 'Notificacion no encontrada' });
        }
    
        res.json(notifAct);
        } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la Notificacion', error });
        }
    });
}
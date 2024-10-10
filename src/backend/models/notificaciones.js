const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotificacionSchema = new Schema({
        fecha: Date,
        estado: { type: String, enum: ['Nueva', 'Leida', 'Eliminada'] },
        motivo: String,
        normativa: { type: mongoose.Schema.Types.ObjectId, ref: 'Normativa' },
        email: String,
        interes: String,
    },{
        collection: 'notificaciones'
    }
);

module.exports = mongoose.model('Notificacion', NotificacionSchema, 'notificaciones');

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, index: { unique: true } },
    username: { type: String, required: true },
    normativasUsuario: [
        {
            idNormativa: { type: mongoose.Schema.Types.ObjectId, ref: 'Normativa' },
            fechaAprobacion: { type: Date, default: Date.now },
            status: { type: String, enum: ['Pendiente', 'Aprobado'] }
        }
    ]
}, {
    collection: 'usuarios'
}
);

module.exports = mongoose.model('Users', UserSchema);
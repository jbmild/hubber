const mongoose = require('mongoose');
const { Schema } = mongoose;

const EquivalenciaSchema = new Schema({
        normativa1: { type: mongoose.Schema.Types.ObjectId, ref: 'Normativa' },
        normativa2: { type: mongoose.Schema.Types.ObjectId, ref: 'Normativa' },
    }
);

module.exports = mongoose.model('Equivalencia', EquivalenciaSchema);

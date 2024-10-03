const mongoose = require('mongoose');
const { Schema } = mongoose;

const EquivalenciaSchema = new Schema({
        normativa1: String,
        normativa2: String,
    }
);

module.exports = mongoose.model('Equivalencia', EquivalenciaSchema);

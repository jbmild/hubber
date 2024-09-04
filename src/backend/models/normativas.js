const mongoose = require('mongoose');
const { Schema } = mongoose;

const NormativaSchema = new Schema({
        pais: String,
        titulo: String,
        descripcion: String,
        agencia: String,
        normativaOrigen: String
    },{
        collection: 'barrerasAlfajores'
    }
);

module.exports = mongoose.model('Normativa', NormativaSchema, 'barrerasAlfajores');

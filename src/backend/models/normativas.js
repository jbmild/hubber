const mongoose = require('mongoose');
const { Schema } = mongoose;

const NormativaSchema = new Schema({
        pais: String,
        titulo: String,
        descripcion: String,
        agencia: String,
        normativaOrigen: String,
        fechaImplementacion: String,
        etiquetas: [String],
        codigos: [String]
    },{
        collection: 'barrerasComerciales'
    }
);

module.exports = mongoose.model('Normativa', NormativaSchema, 'barrerasComerciales');

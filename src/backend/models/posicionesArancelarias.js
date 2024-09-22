const mongoose = require('mongoose');
const { Schema } = mongoose;

const PosicionIMASchema = new Schema({
        posicion: String,
    },{
        collection: 'posicionesima'
    }
);

module.exports = mongoose.model('PosicionArancelaria', PosicionIMASchema, 'posicionesima');
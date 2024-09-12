const mongoose = require('mongoose');
const { Schema } = mongoose;

const PosicionSchema = new Schema({
        posicion: String,
    },{
        collection: 'posicionesima'
    }
);

module.exports = mongoose.model('PosicionArancelaria', PosicionSchema, 'posicionesima');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const productosSchema = new Schema ({
    producto: String
});

module.exports = mongoose.model('Producto', productosSchema, 'productos');
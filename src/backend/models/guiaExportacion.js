const mongoose = require('mongoose');
const { Schema } = mongoose;

const guiaExportacionSchema = new Schema ({
    titulo: String,
    descripcion: String
});

module.exports = mongoose.model('GuiaExportacion', guiaExportacionSchema, 'guiaExportacion');
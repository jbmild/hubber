const mongoose = require('mongoose');
const { Schema } = mongoose;

const ArbolSchema = new Schema({
    posicion: String,
    descripcion: String,
    derechos_exportacion: String,
    arancel_externo_comun: String,
    reintegros_extrazona: String,
    derechos_importacion_extrazona: String,
    reintegros_intrazona: String,
    derechos_importacion_intrazona: String,
    derechos_importacion_especifico_minimo: String,
    texto_partida: String,
    pos_padre: String,
    derecho_exportacion_adicional: String,
    padre_directo: String,
    pos_sin_puntos: String
},{
    collection: 'arbolPosiciones'
}
);

module.exports = mongoose.model('PosicionArbol', ArbolSchema, 'arbolPosiciones');

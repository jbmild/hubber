const GuiaExportacion = require('../models/guiaExportacion');

exports.traerGuiasDeExportacion = async () => {
    return await GuiaExportacion.find({}, {_id: 0}).exec();
}
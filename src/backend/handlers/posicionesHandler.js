const PosicionArancelaria = require('../models/posicionesArancelarias')

exports.handleTraerPosiciones = async (req, res) => {
    const posiciones = await PosicionArancelaria.find().limit(5);  
    res.status(200).json(posiciones);
  };
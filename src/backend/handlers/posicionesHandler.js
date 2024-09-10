const PosicionArancelaria = require('../models/posicionesArancelarias')

exports.handleTraerPosiciones = async (req, res) => {
      const query = req.query.query;
      const limit = req.query.limit;
      const offset = req.query.offset;

  try {
      const totalResults = await PosicionArancelaria.countDocuments({ "posicion": { $regex: query, $options: 'i' } });
      const posiciones = await PosicionArancelaria.find({ "posicion": { $regex: query, $options: 'i' }})
        .skip(parseInt(offset))
        .limit(parseInt(limit))
        .exec();  
      res.status(200).json({posiciones, totalResults});
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });  // Manejo de errores
  }
};
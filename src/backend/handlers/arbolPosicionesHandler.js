const PosicionArbol = require('../models/arbolPosiciones')

exports.handleTraerHijos = async (req, res) => {
  const padre = req.query.padre;
  try {
    const posiciones = await PosicionArbol.find({"padre_directo": padre})
    res.status(200).json({posiciones});
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' }); 
  }
};

exports.handleTraerSecciones = async (req, res) => {
  try {
    let secciones = await PosicionArbol.find({"posicion" : {$regex: "^[A-Z]{1,5}$", $options: 'i'}}).limit(21).sort({"desde":1})
    res.status(200).json({secciones});
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' }); 
  }
};
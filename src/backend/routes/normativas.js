const { handleTraerNormativas } = require("../handlers/normativasHandler");
const Normativa = require("../models/normativas");

module.exports = function (app){
    app.get('/normativas',
    handleTraerNormativas
    );

    app.get('/normativas/:id', async (req, res) => {
        try {
          const normativaId = req.params.id;
          const normativa = await Normativa.findById(normativaId);
      
          if (!normativa) {
            return res.status(404).json({ message: 'Normativa no encontrada' });
          }
      
          res.json(normativa);
        } catch (error) {
          res.status(500).json({ message: 'Error al obtener la normativa', error });
        }
      });
      
}
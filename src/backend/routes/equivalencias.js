const Equivalencia = require('../models/equivalencias');

module.exports = function (app) {

    const ensureAuthenticated = (req, res, next) => {
        console.log(req.isAuthenticated());
        if (req.isAuthenticated()) {
            return next();
        }
        res.status(401).json({ error: 'Not authenticated' });
    };

    app.get('/equivalencias', ensureAuthenticated, async(req, res) => {
            try{
                const page = req.query.page;
                const limit = req.query.limit;
                const skip = page * limit;
                const equivalencias = await Equivalencia.find({}).skip(skip).limit(limit).exec();
                const totalItems = await Equivalencia.countDocuments().exec();
                const response = {
                    items: equivalencias,
                    page,
                    limit,
                    totalItems
                  }
                res.status(200).json(response);
            } catch (error) {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    );


    app.post('/equivalencia/new', ensureAuthenticated, async (req, res) => {
            try{
                const {n1, n2} = req.body;
                const filtro = {
                    $and : [
                        {$or : [{normativa1 : n1}, {normativa2: n1}]},
                        {$or : [{normativa2 : n2},{normativa2 : n2}]}
                    ]
                }
                const found = await Equivalencia.find(filtro);
                    if (found.length > 0) {
                        return res.status(400).send({ error: "Equivalencia ya existe." });
                    }
                const equivalencia = await Equivalencia.create({normativa1:n1, normativa2:n2})
                res.status(200).send(JSON.stringify(equivalencia));
            } catch (err) {
                res.status(500).send({ error: err.message });
            }
        }
    );

    app.delete(
        '/equivalencia/:id', ensureAuthenticated, async (req, res) => {
            try{
                const result = await Equivalencia.findByIdAndDelete(req.params.id);
                if (!result) {
                    return res.status(404).json({ success: false, message: 'Error al eliminar equivalencia' });
                } else {
                    return res.json({ success: true, message: `Se elimino la equivalencia`, idEquivalencia: req.params.id});
                } 
            } catch(error){
                res.status(500).json({ success: false, message: 'Error eliminando equivalencia', error });
            }
        }
    );
}

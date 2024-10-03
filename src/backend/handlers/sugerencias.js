const User = require('../models/users'); // Path to the Book model
const Equivalencia = require('../models/equivalencias'); // Path to the Book model
const Normativa = require('../models/normativas'); // Path to the Book model

exports.getSugerenciasHandler = async (req, res) => {
    try {
        //const userId = req.user._id;
        const userId = "66e39ceaf68cb7be8e03df38";
        const usuario = await User.findById(userId);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        //Obtengo los ids de todas las normativas y equivalencias del usuario
        const idNormativas = usuario.normativasUsuario.map(n => n._id.toString());
        const equivalenciasObj = await Equivalencia.find({ $or: [{ normativa1: { $in: idNormativas } }, { normativa2: { $in: idNormativas } }] });
        const equivalenciasPlanas = equivalenciasObj.flatMap(e => { return [e.normativa1.toString(), e.normativa2.toString()] });
        const equivalenciasIdsPre = equivalenciasPlanas.concat(idNormativas);
        const equivalenciasIds = equivalenciasIdsPre.filter(function (item, pos) {
            return equivalenciasIdsPre.indexOf(item) == pos;
        });

        //Obtener todos los productos que exporta
        const normativas = await Normativa.find({ _id: { $in: equivalenciasIds } });
        console.log("normativas", normativas.length)
        const productosPre = normativas.flatMap(n => n.codigos);
        const productos = productosPre.filter(function (item, pos) {
            return productosPre.indexOf(item) == pos;
        });
        console.log("productos", productos.length)

        //Obtener todos los paises disponibles
        const paises = await Normativa.aggregate([
            {
                $group: {
                    _id: "$pais"
                }
            },
            {
                $project: {
                    _id: 0,
                    pais: "$_id"
                }
            }
        ])

        const sugerencias = [];
        for (let i = 0; i < productos.length; i++) {
            const producto = productos[i];
            if (!producto) continue;
            for (let j = 0; j < paises.length; j++) {
                const pais = paises[j].pais;
                if (!pais) continue;

                const normativasPais = await Normativa.find({ pais: pais, codigos: { $elemMatch: { $eq: producto } }, _id: { $nin: equivalenciasIds } });

                console.log("pais", pais, "producto", producto, "normativasPais", normativasPais.length)
                if(!sugerencias[pais]) sugerencias[pais] = {};
                sugerencias[pais][producto] = normativasPais.map(n => n._id);
            }
        }

        res.status(200).send(JSON.stringify(sugerencias));
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
}
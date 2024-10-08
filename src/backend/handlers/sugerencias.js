const User = require('../models/users'); // Path to the Book model
const Equivalencia = require('../models/equivalencias'); // Path to the Book model
const Normativa = require('../models/normativas'); // Path to the Book model

const obtenerNormativasEquivalentes = async (idNormativas) => {
    const equivalenciasObj = await Equivalencia.find({ $or: [{ normativa1: { $in: idNormativas } }, { normativa2: { $in: idNormativas } }] });
    const equivalenciasPlanas = equivalenciasObj.flatMap(e => { return [e.normativa1.toString(), e.normativa2.toString()] });
    const equivalenciasIdsPre = equivalenciasPlanas.concat(idNormativas);
    const equivalenciasIds = equivalenciasIdsPre.filter(function (item, pos) {
        return equivalenciasIdsPre.indexOf(item) == pos;
    });

    return equivalenciasIds
}

exports.getSugerenciasHandler = async (req, res) => {
    try {
        //const userId = req.user._id;
        const userId = "66e39ceaf68cb7be8e03df38";
        const usuario = await User.findById(userId);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const productos = usuario.productos_interes || [];
        console.log("productos", productos);
        //Obtengo los ids de todas las normativas y equivalencias del usuario
        const idNormativas = usuario.normativasUsuario.map(n => n._id.toString());
        const equivalenciasIds = await obtenerNormativasEquivalentes(idNormativas)
        console.log("equivalenciasIds", equivalenciasIds);

        //Obtener todos los paises disponibles
        const paises = await Normativa.aggregate([
            { $match: { _id: { $nin: equivalenciasIds }, etiquetas: { $elemMatch: { $in: productos } } } },
            {
                $unwind: "$etiquetas"

            },
            {
                $group: {
                    _id: {
                        pais: "$pais",
                        etiqueta: "$etiquetas"
                    },
                    count: { $sum: 1 }

                }
            }
        ])

        const resp = paises.reduce((acc, curr) => {
            if (!acc[curr._id.etiqueta]) acc[curr._id.etiqueta] = {};

            acc[curr._id.etiqueta][curr._id.pais] = curr.count

            return acc
        }, {})

        res.status(200).send(JSON.stringify(resp));
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
}
const User = require('../models/users'); // Path to the Book model

exports.createUserHandler = async (req, res) => {
    const payload = req.body

    try {
        const user = await User.create(payload)
        res.status(200).send(JSON.stringify(user));
    } catch (err) {
        res.status(400).send({ error: true, message: err.message });
    }
}

exports.loginUserHandler = async (req, res) => {
    const payload = req.body

    try {
        const user = await User.findOne({ username: payload.username })
        if (user) {
            const match = await user.comparePassword(payload.password)
            console.log("match", match)
            if (match) {
                res.status(200).send(JSON.stringify(user));
            } else {
                res.status(400).send({ error: true, message: "Usuario/contraseña invalidos" });
            }
        } else {
            res.status(400).send({ error: true, message: "Usuario/contraseña invalidos" });
        }
    } catch (err) {
        res.status(400).send({ error: true, message: err.message });
    }
}
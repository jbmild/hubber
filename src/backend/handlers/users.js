const User = require('../models/users'); // Path to the Book model

exports.createUserHandler = async (req, res) => {
    const payload = req.body

    try {
        const userFound = await User.findOne({ username: payload.username })
        if (userFound) {
            return res.status(400).send({ error: "El nombre de usuario ya existe." });
        }
        const user = await User.create(payload)
        res.status(200).send(JSON.stringify(user));
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
}
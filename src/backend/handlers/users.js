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
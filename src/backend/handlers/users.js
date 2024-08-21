exports.createUserHandler = (req, res) => {
    const { email, password, username } = req.body

    res.status(200).send(email + " - " + password + " - " + username);
}
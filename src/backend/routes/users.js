const { validate } = require('../middleware/validationMiddleware')
const { createValidator } = require("../validators/users")
const { createUserHandler } = require("../handlers/users")

module.exports = function (app) {
    app.post(
        '/users/create',
        validate(createValidator),
        createUserHandler
    );
}
const { validate } = require('../middleware/validationMiddleware')
const { createValidator, loginValidator } = require("../validators/users")
const { createUserHandler, loginUserHandler } = require("../handlers/users")

module.exports = function (app) {
    app.post(
        '/users/create',
        validate(createValidator),
        createUserHandler
    );

    app.post(
        '/users/login',
        validate(loginValidator),
        loginUserHandler
    );
}
const { joiMessages } = require('./joiErrorMessages');
const Joi = require('joi').defaults(schema => schema.options(joiMessages));

exports.createValidator = Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
});
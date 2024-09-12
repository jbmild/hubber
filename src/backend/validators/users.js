const Joi = require("joi");

const PASSWORD_REGEX = new RegExp(
    "[a-zA-Z0-9]{8,12}"
    //"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])(?=.{8,})"
);

exports.createValidator = Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(PASSWORD_REGEX).min(8).required(),
});

exports.loginValidator = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().pattern(PASSWORD_REGEX).min(8).required(),
});
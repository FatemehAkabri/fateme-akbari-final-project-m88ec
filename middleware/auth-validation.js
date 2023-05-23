const Joi = require("joi");
const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*\d)/;
const phoneNumberRegExp = /^(\\+98|0)?9\\d{9}$/;

const signUpValidator = Joi.object({
  firstName: Joi.string().required().min(3).max(30).trim(),
  lastName: Joi.string().required().min(3).max(30).trim(),
  userName: Joi.string().required().min(3).max(30).trim(),
  password: Joi.string().required().trim().pattern(passwordRegExp),
  gender: Joi.string().valid("male", "female", "not-set").default("not-set"),
  phoneNumber: Joi.string().required(),
  role: Joi.string().valid("user", "admin").default("user"),
});

const logInValidator = Joi.object({
  userName: Joi.string().required().trim(),
  password: Joi.string().required(),
});

module.exports = { signUpValidator, logInValidator };

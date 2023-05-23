const Joi = require("joi");
const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*\d)/;
const phoneNumberRegExp = /^(\\+98|0)?9\\d{9}$/;

const updateUserValidator = Joi.object({
  firstName: Joi.string().required().min(3).max(30).trim(),
  lastName: Joi.string().required().min(3).max(30).trim(),
  userName: Joi.string().required().min(3).max(30).trim(),
  gender: Joi.string().valid("male", "female", "not-set").default("not-set"),
  phoneNumber: Joi.string().required(),
});

const changePasswordValidation = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().min(8).required().trim().pattern(passwordRegExp),
});

module.exports = { updateUserValidator, changePasswordValidation };

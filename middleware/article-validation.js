const Joi = require("joi");

const articleValidation = Joi.object({
  title: Joi.string().required().min(3),
  discription: Joi.string().min(3),
  thumbnail: Joi.string().required(),
  content: Joi.string().required(),
  articlePicturs: Joi.array().items(Joi.string()),
  author: Joi.required(),
});


module.exports = { articleValidation };

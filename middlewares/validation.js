const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

module.exports.validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),

    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),
  }),
});

module.exports.validateId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().hex().length(24),
  }),
});

module.exports.validateSignIn = celebrate({
  body: Joi.object().keys({
    password: Joi.string().required().messages({
      "string.empty": 'The "Password" field must be filled in',
    }),
    email: Joi.string().email().required().messages({
      "string.empty": 'The "Email" field must be filled in',
      "string.email": 'The "Email" email field must be valid',
    }),
  }),
});

module.exports.validateSignUp = celebrate({
  body: Joi.object().keys({
    password: Joi.string().required().messages({
      "string.empty": 'The "Password" field must be filled in',
    }),
    email: Joi.string().email().required().messages({
      "string.empty": 'The "Email" field must be filled in',
      "string.email": 'The "Email" email field must be valid',
    }),

    username: Joi.string().required().messages({
      "string.empty": 'The "Username" field must be filled in',
    }),
  }),
});

module.exports.validateUsers = celebrate({
  body: Joi.object().keys({
    username: Joi.string().required().messages({
      "string.empty": 'The "Username" field must be filled in',
    }),
  }),
});

const { Schema, model } = require('mongoose');
const Joi = require('joi');

const nameRegexp = /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/;
const phoneRegexp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;

const contactSchema = Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
      match: nameRegexp,
    },
    email: {
      type: String,
      required: [true, 'Set email for contact'],
    },
    phone: {
      type: String,
      required: [true, 'Set phone for contact'],
      match: phoneRegexp,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  }
    , { versionKey: false, timestamps: true });

const contactJoiSchema = Joi.object({
    name: Joi.string().pattern(nameRegexp).required(),
    email: Joi.string().email(),
    phone: Joi.string().pattern(phoneRegexp).required(),
    favorite: Joi.boolean(),
    })

const favoriteJoiSchema = Joi.object({
     favorite: Joi.boolean().required(),
});

const Contact = model('contact', contactSchema);

module.exports = {
    Contact,
    contactJoiSchema,
    favoriteJoiSchema
}
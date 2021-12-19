const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const Joi = require('joi');

const userSchema = Schema({
      email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
      password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 7,
      },
      subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
      token: {
        type: String,
        default: null
    },
        avatarURL: String,

}, { versionKey: false, timestamps: true });

userSchema.methods.setPassword = function (password) {
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

const userJoiSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(7).required(),
});

const updateSubscription = Joi.object({
	subscription: Joi.string().required().valid('starter', 'pro', 'business'),
});

const User = model('user', userSchema);

module.exports = {
    User,
    userJoiSchema,
    updateSubscription
}

const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

// name, email, photo, password, confirmPassword

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'You must enter your name!'],
  },
  email: {
    type: String,
    required: [true, 'You must enter tour email!'],
    unique: [true, 'Your email have already used!'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'You must enter password!'],
    minlength: [8, 'You must enter at least 8 character!'],
  },
  passwordConfirm: {
    type: String,

    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: 'Your confirm password not the same password',
    },
  },
});

userSchema.pre('save', async function (next) {
  // exact the same password or change checked
  if (!this.isModified('password')) return next();

  // hashing password with bcrypt
  this.password = await bcrypt.hash(this.password, 12);

  // delete password confirm field
  this.passwordConfirm = undefined;

  next();
});

const User = mongoose.model('users', userSchema);

module.exports = User;

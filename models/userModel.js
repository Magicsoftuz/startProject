const mongoose = require('mongoose');
const validator = require('validator');

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
    validate: [validator.email, 'Please provide a valid email'],
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
    required: [true, 'You must enter confirm password!'],
    rue,
  },
});

const User = mongoose.model('users', userSchema);

module.exports = User;

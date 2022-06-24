const catchErrorAsync = require('../utility/catchAsync');
const user = require('./../models/userModel');
const responseJSON = require('./../utility/responseJSON');
const jwt = require('jsonwebtoken');

const signup = catchErrorAsync(async (req, res, next) => {
  const newUser = await user.create({
    name: req.body.name,
    email: req.body.email,
    photo: req.body.photo,
    password: req.body.password,
  });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(200).json({
    status: 'success',
    token: token,
    data: newUser,
  });
});

module.exports = { signup };

const User = require('../models/userModel');
const catchErrorAsync = require('../utility/catchAsync');
const bcrypt = require('bcryptjs');
const AppError = require('../utility/appError');
const authController = require('./authController');

const getAllUsers = catchErrorAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    userInfo: req.user,
    data: users,
  });
});

const addUser = (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: 'This route has not created yet!',
  });
};
const updateUser = (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: 'This route has not created yet!',
  });
};
const getUserById = catchErrorAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError('Bunday user mavjud emas!', 404));
  }

  res.status(200).json({
    status: 'Success',
    data: user,
  });
  next();
});
const deleteUser = catchErrorAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'Success',
    message: 'User has been deleted',
  });
});

const updateMePassword = catchErrorAsync(async (req, res, next) => {
  // 1) Eski parolni tekshirishib kuramiz

  if (req.body.oldPassword == req.body.newPassword) {
    return next(
      new AppError('Yangi va eski parollar bir xil bulmasligi kerak!', 404)
    );
  }

  if (!req.body.oldPassword) {
    return next(new AppError('Siz eski parolni kiritishingiz shart!', 401));
  }

  const user = await User.findById(req.user.id).select('+password');
  console.log(user);
  const tekshir = await bcrypt.compare(req.body.oldPassword, user.password);
  if (!tekshir) {
    return next(new AppError('Notugri eski parolni kiritdingiz!', 401));
  }

  // 2) Yangi parolni saqlaymiz.
  if (req.body.newPassword != req.body.newPasswordConfirm) {
    return next(
      new AppError(
        'Siz ikki xil parol kiritib quydingiz, Iltimos qayta tekshiring!',
        401
      )
    );
  }

  user.password = req.body.newPassword;
  user.passwordConfirm = req.body.newPasswordConfirm;
  user.passwordChangedDate = Date.now();
  await user.save();

  // 3) Yangi JWT berish

  const token = authController.createToken(user._id);

  res.status(200).json({
    status: 'success',
    token: token,
  });
});

const updateMe = catchErrorAsync(async (req, res, next) => {
  // 1) Malumotlarni yangilash

  const user = await User.findById(req.user.id);

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.photo = req.body.photo || user.photo;

  const newUser = await user.save({ validateBeforeSave: false });

  res.status(201).json({
    status: 'success',
    data: newUser,
  });
});

const deleteMe = catchErrorAsync(async (req, res, next) => {
  // 1) User ni topamiz

  const user = await User.findById(req.user.id).select('active password');

  // 2) Passwordni tekshirish
  const tekshir = bcrypt.compare(req.body.password, user.password);

  if (!tekshir) {
    return next(new AppError('Siz parolni xato kiritdingiz!', 401));
  }

  user.active = false;
  await user.save({ validateBeforeSave: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

module.exports = {
  getAllUsers,
  addUser,
  getUserById,
  updateUser,
  deleteUser,
  updateMePassword,
  updateMe,
  deleteMe,
};

const User = require('../models/userModel');
const catchErrorAsync = require('../utility/catchAsync');
const jwt = require('jsonwebtoken');
const AppError = require('../utility/appError');
const bcrypt = require('bcryptjs');

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const signup = catchErrorAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    photo: req.body.photo,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = createToken(newUser._id);

  res.status(200).json({
    status: 'success',
    token: token,
    data: newUser,
  });
});

const login = catchErrorAsync(async (req, res, next) => {
  // 1) Email bilan password borligini tekshirish

  const { email, password } = { ...req.body };

  if (!email || !password) {
    return next(new AppError('Email yoki passwordni kiriting! Xato!!!', 401));
  }

  // 2) Shunaqa odam bormi yuqmi shuni tekshirish
  const user = await User.findOne({ email });
  if (!user) {
    return next(
      new AppError('Bunday user mavjud emas. Iltimos royxatdan uting!', 404)
    );
  }

  // 3) password tugri yokin notugriligini tekshirish
  const tekshirHashga = async (oddiyPassword, hashPassword) => {
    const tekshir = await bcrypt.compare(oddiyPassword, hashPassword);
    return tekshir;
  };

  if (!(await tekshirHashga(password, user.password))) {
    return next(
      new AppError(
        'Sizning parol yoki loginingiz xato! Iltimos qayta urinib kuring!',
        401
      )
    );
  }
  // 4) JWT token yasab berish
  const token = createToken(user._id);

  // 5) Response qaytarish
  res.status(200).json({
    status: 'success',
    token: token,
  });
});

const protect = catchErrorAsync(async (req, res, next) => {
  // 1) Token bor yuqligini headerdan tekshirish
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new AppError('Siz tizimga kirishingiz shart!'));
  }
  // 2) Token ni tekshirish Serverniki bilan clientnikini solishtirish
  const tekshir = jwt.verify(token, process.env.JWT_SECRET);

  if (!(await tekshir)) {
    return next(
      new AppError('Bunday token mavjud emas. Iltimos qayta tizimga kiring!')
    );
  }

  // 3) Token ichidan idni olib databasedagi userni topamiz.

  next();
});

module.exports = { signup, login, protect };

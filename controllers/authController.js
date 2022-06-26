const User = require('../models/userModel');
const catchErrorAsync = require('../utility/catchAsync');

const signup = catchErrorAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  res.status(200).json({
    status: 'success',
    data: newUser,
  });
});

module.exports = { signup };

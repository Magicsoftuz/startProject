const catchErrorAsync = require('../utility/catchAsync');
const user = require('./../models/userModel');
const responseJSON = require('./../utility/responseJSON');

const signup = catchErrorAsync(async (req, res, next) => {
  const newUser = await user.create(req.body);

  responseJSON(res, 200, 'success', newUser);
});

module.exports = { signup };

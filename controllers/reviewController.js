const Review = require('../models/reviewModel');
const AppError = require('../utility/appError');
const catchErrorAsync = require('../utility/catchAsync');

const getAllReviews = catchErrorAsync(async (req, res, next) => {
  const reviews = await Review.find()
    .populate({
      path: 'user',
      select: 'name photo',
    })
    .populate({
      path: 'tour',
      select: 'name',
    });
  res.status(200).json({
    status: 'success',
    data: reviews,
  });
});

const addReview = catchErrorAsync(async (req, res, next) => {
  const data = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: data,
  });
});

module.exports = { addReview, getAllReviews };

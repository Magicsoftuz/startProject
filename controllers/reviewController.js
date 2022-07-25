const Review = require('../models/reviewModel');
const AppError = require('../utility/appError');
const catchErrorAsync = require('../utility/catchAsync');
const {
  getAll,
  getOne,
  add,
  update,
  deleteData,
} = require('./handlerController');

const options = {
  path: 'tour',
  select: 'name',
};
const options2 = {
  path: 'user',
  select: 'name',
};

const getAllReviews = (req, res, next) => {
  let modelReview;
  if (req.params.id) {
    modelReview = Review.find({ tour: req.params.id });
  } else {
    modelReview = Review;
  }
  getAll(req, res, next, modelReview, options, options2);
};

const addReview = catchErrorAsync(async (req, res, next) => {
  let data;
  if (!req.params.id) {
    data = await Review.create(req.body);
  } else {
    const tourId = req.params.id;
    data = await Review.create({
      review: req.body.review,
      rating: req.body.rating,
      tour: tourId,
      user: req.body.user,
    });
  }

  res.status(201).json({
    status: 'success',
    data: data,
  });
});

const getReviewById = (req, res, next) => {
  getOne(req, res, next, Review, options, options2);
};

const updateReview = (req, res, next) => {
  update(req, res, next, Review);
};

const deleteReview = (req, res, next) => {
  deleteData(req, res, next, Review);
};

module.exports = {
  addReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
};

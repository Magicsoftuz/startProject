const Review = require('../models/reviewModel');
const catchErrorAsync = require('../utility/catchAsync');
const FeatureAPI = require('../utility/featureApi');

const getAllReview = catchErrorAsync(async (req, res, next) => {
  const query = new FeatureAPI(req.query, Review)
    .filter()
    .sorting()
    .field()
    .pagination();

  const review = query.databaseQuery;
  const data = await review;

  res.status(200).json({
    status: 'success',
    data: data,
  });
});

const getReviewById = catchErrorAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: review,
  });
});

const addReview = catchErrorAsync(async (req, res, next) => {
  const review = await Review.create(req.body);
  res.status(200).json({
    status: 'success',
    data: review,
  });
});

const updateReview = catchErrorAsync(async (req, res, next) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body);

  res.status(201).json({
    status: 'success',
    data: review,
  });
});

const deleteReview = catchErrorAsync(async (req, res, next) => {
  const review = await Review.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: review,
  });
});

module.exports = {
  getAllReview,
  getReviewById,
  addReview,
  updateReview,
  deleteReview,
};

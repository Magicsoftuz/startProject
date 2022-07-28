const AppError = require('../utility/appError');
const catchErrorAsync = require('../utility/catchAsync');
const Tour = require('./../models/tourModel');

const getAllTours = catchErrorAsync(async (req, res) => {
  // 1) Get all tours
  const tours = await Tour.find();

  if (!tours) {
    res.status(404).render('error', {});
  }

  res.status(200).render('overview', {
    title: 'All tours',
    tours: tours,
  });
});

const getOneTour = catchErrorAsync(async (req, res) => {
  const slug = req.params.id;

  const tour = await Tour.findOne({ _id: req.params.id }).populate({
    path: 'reviews',
    select: 'review rating user',
  });
  console.log(tour);
  if (!tour) {
    return next(new AppError('This page not found', 404));
  }

  console.log(tour);

  res.status(200).render('tour', {
    tour: tour,
  });
});

const login = catchErrorAsync(async (req, res, next) => {
  res.status(200).render('login', {});
});

module.exports = { getAllTours, getOneTour, login };
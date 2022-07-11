const catchErrorAsync = require('../utility/catchAsync');
const Tour = require('./../models/tourModel');

const getAllTours = catchErrorAsync(async (req, res) => {
  // 1) Get all tours
  const tours = await Tour.find();

  res.status(200).render('overview', {
    title: 'All tours',
    tours: tours,
  });
});

const getOneTour = (req, res) => {
  res.status(200).render('tour', {
    title: 'This Tashkent City',
  });
};

module.exports = { getAllTours, getOneTour };

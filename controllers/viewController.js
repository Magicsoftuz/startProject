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

const getOneTour = catchErrorAsync(async (req, res) => {
  const slug = req.params.slug;
  console.log(slug);
  const tour = await Tour.findOne({ slug: slug }).populate({
    path: 'reviews',
    select: 'review rating user',
  });
  console.log(tour);
  res.status(200).render('tour', {
    title: tour.name,
    tour: tour,
  });
});

module.exports = { getAllTours, getOneTour };

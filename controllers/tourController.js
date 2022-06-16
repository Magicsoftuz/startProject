const Tour = require('./../models/tourModel');

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    // getDate: req.time,
    // results: tours.length,
    // data: {
    //   tours,
    // },
  });
};

const addTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(200).json({
      status: 'Success',
      data: newTour,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};
const getTourById = (req, res) => {};
const updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: 'Information updated',
    },
  });
};
const deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

module.exports = {
  getAllTours,
  addTour,
  getTourById,
  updateTour,
  deleteTour,
};

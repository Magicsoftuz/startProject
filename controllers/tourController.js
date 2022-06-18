const Tour = require('./../models/tourModel');
const featureApi = require('./../utility/featureApi');

const getAllTours = async (req, res) => {
  try {
    const query = new featureApi(req.query, Tour)
      .filter()
      .sorting()
      .field()
      .pagination();

    const tours = query.databaseQuery;
    const data = await tours;

    res.status(200).json({
      status: 'success',
      results: data.length,
      data: data,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

const addTour = async (req, res) => {
  try {
    const data = req.body;
    const tour = await Tour.create(data);
    res.status(201).json({
      status: 'success',
      data: tour,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};
const getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: tour,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};
const updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: 'success',
      data: tour,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};
const deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: tour,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};
Tour.find({ price: 500 });

const tourStats = async (req, res) => {
  try {
    const data = await Tour.aggregate([{ $match: { duration: { $gte: 10 } } }]);
    res.status(200).json({
      status: 'success',
      data: data,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

module.exports = {
  getAllTours,
  addTour,
  getTourById,
  updateTour,
  deleteTour,
  tourStats,
};

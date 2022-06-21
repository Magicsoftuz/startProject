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
    const data = await Tour.aggregate([
      { $match: { ratingsAverage: { $gte: 4.5 } } },
      {
        $group: {
          _id: { $toUpper: '$difficulty' },
          numberTours: { $sum: 1 },
          urtachaNarx: { $avg: '$price' },
          engArzonNarx: { $min: '$price' },
          engQimmatNarx: { $max: '$price' },
          urtachaReyting: { $avg: '$ratingsAverage' },
        },
      },
      { $sort: { urtachaNarx: -1 } },
      { $project: { _id: 0 } },
    ]);
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

// Yilni tanlay (2021)
//

const tourReportYear = async (req, res) => {
  try {
    const data = await Tour.aggregate([
      {
        $unwind: '$startDates',
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${req.params.year}-01-01`),
            $lte: new Date(`${req.params.year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          tourlarSoni: { $sum: 1 },
          tourNomi: { $push: '$name' },
        },
      },
      { $addFields: { qaysiOyligi: '$_id' } },
      { $project: { _id: 0 } },
      { $sort: { tourlarSoni: -1 } },
      { $limit: 2 },
    ]);
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
const getOneField = async (req, res) => {
  try {
    const data = await Tour.aggregate([{ $match: {} }]);
  } catch (err) {}
};

module.exports = {
  getAllTours,
  addTour,
  getTourById,
  updateTour,
  deleteTour,
  tourStats,
  tourReportYear,
};

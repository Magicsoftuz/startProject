const AppError = require('../utility/appError');
const catchErrorAsync = require('../utility/catchAsync');
const FeatureAPI = require('../utility/featureApi');

const responseFunction = (res, statusCode, data) => {
  if (Array.isArray(data)) {
    res.status(statusCode).json({
      status: 'Success',
      results: data.length,
      data: data,
    });
  } else {
    res.status(statusCode).json({
      status: 'Success',
      data: data,
    });
  }
};

const getAll = catchErrorAsync(
  async (req, res, next, Model, options, options2, dataOption) => {
    let datas;
    const filter = new FeatureAPI(req.query, Model)
      .filter()
      .sorting()
      .field()
      .pagination();

    if (options2) {
      datas = await filter.databaseQuery.populate(options).populate(options2);
    } else if (options) {
      datas = await filter.databaseQuery.populate(options);
    } else {
      datas = await filter.databaseQuery;
    }
    responseFunction(res, 200, datas);
  }
);

const getOne = catchErrorAsync(
  async (req, res, next, Model, options, options2) => {
    let data;
    if (options2) {
      data = await Model.findById(req.params.id)
        .populate(options)
        .populate(options2);
    } else if (options) {
      data = await Model.findById(req.params.id).populate(options);
    } else {
      data = await Model.findById(req.params.id);
    }
    responseFunction(res, 200, data);
  }
);

const add = catchErrorAsync(async (req, res, next, Model) => {
  const data = await Model.create(req.body);
  responseFunction(res, 201, data);
});

const update = catchErrorAsync(async (req, res, next, Model) => {
  const data = await Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    validator: true,
  });

  if (!data) {
    return next(new AppError('Not found this ID', 404));
  }

  responseFunction(res, 202, data);
});

const deleteData = catchErrorAsync(async (req, res, next, Model) => {
  const data = await Model.findByIdAndDelete(req.params.id);

  responseFunction(res, 204, data);
});

module.exports = { getAll, getOne, add, update, deleteData };

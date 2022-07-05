const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utility/appError');
const ErrorController = require('./controllers/errorController');

const app = express();
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use('/api', function (req, res, next) {
  res.cookie('jwt', res.headers);
});

app.use(morgan('dev'));

app.use(express.static('public'));
app.use(express.static('dev-data'));

app.use((req, res, next) => {
  console.log('Hello from Middelware');
  next();
});

app.use((req, res, next) => {
  req.time = '12.04.2022';
  next();
});
// app.get('/', (req, res) => {
//   res.status(200).json({
//     message: 'This server is working!',
//     data: 'Bu yerda json chiqishi kerak edi',
//   });
// });

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', addTour);
// app.get('/api/v1/tours/:id', getTourById);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', function (req, res, next) {
  next(new AppError(`this url has not found: ${req.originalUrl}`, 404));
});

app.use(ErrorController);

module.exports = app;

// Overview of Error handling

// 1)Operation errors
//
// 1. Xato url berish
// 2. Inputga kiritilayotgan xato malumot
// 3. Serverga tugri ulanolmaslik (Sekin internet)
// 4. Database ulanolmaslik
// 5....

// 2)Programming Errors
//
// 1. property ni uqiyotganda undefined bulishi
// 2. await dan foydalanish async siz
// 3. req.body ni ishlatish req.query urniga
// 4....

// Global Error handling middleware

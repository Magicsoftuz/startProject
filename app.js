const express = require('express');
const path = require('path');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const AppError = require('./utility/appError');
const ErrorController = require('./controllers/errorController');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const sanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const { urlencoded } = require('express');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet());

app.use(express.json({ limit: '10kb' }));
app.use(urlencoded({ limit: '10kb' }));
app.use(cookieParser());

app.use(sanitize());

app.use(xss());

app.use(hpp());

app.use(morgan('dev'));

app.use(express.static('public'));
app.use(express.static('dev-data'));

app.use((req, res, next) => {
  console.log(req.cookies);
  next();
});

app.use((req, res, next) => {
  req.time = '12.04.2022';
  next();
});

const limit = rateLimit({
  max: 10,
  windowMs: 1 * 60 * 60 * 1000,
  message: 'Too many requests from this IP, Please try again later',
});

app.use('/api', limit);

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

app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

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

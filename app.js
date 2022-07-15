const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const AppError = require('./utility/appError');
const ErrorController = require('./controllers/errorController');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const sanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const app = express();

app.use(express.json({ limit: '10kb' })); // req ulchami ga limit quyish

app.use(sanitize()); // req body ni tekshiradi masalan $ simovali bilan
app.use(xss()); // Html ichiga virus tiqib yubormoqchi bulsa ushlab qoladi

const limiter = rateLimit({
  max: 10,
  windowMs: 1 * 60 * 1000,
  message: 'Siz kup surov berib yubordingiz!',
}); // requestlar sonini sanaydi va cheklaydi

app.use('/api', limiter);

app.use(helmet()); // Headers ni sekuritysini kuchaytiradi
app.use(hpp()); // URL xatolarni ushlaydi

app.use(express.static(`${__dirname}/public`));

app.use(morgan('dev'));

app.use(express.static('public'));
app.use(express.static('dev-data'));

app.use((req, res, next) => {
  console.log('Hello from Middelware');
  next();
});

app.use('/api/v1/reviews', reviewRouter);
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

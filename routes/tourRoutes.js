const express = require('express');
const app = require('../app');
const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');
const reviewRoute = require('./reviewRoutes');

const router = express.Router();

router.use(
  '/the-best-3-tours',
  (req, res, next) => {
    req.query.sort = '-price';
    req.query.limit = 3;
    next();
  },
  tourController.getAllTours
);

router.route('/stats').get(authController.protect, tourController.tourStats);
router
  .route('/report/:year')
  .get(
    authController.protect,
    authController.role(['admin']),
    tourController.tourReportYear
  );

router.use('/:id/reviews', reviewRoute);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.role(['admin', 'lead-guide']),
    tourController.addTour
  );

router
  .route('/:id')
  .get(tourController.getTourById)
  .patch(
    authController.protect,
    authController.role(['admin', 'lead-guide']),
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.role(['admin', 'lead-guide']),
    tourController.deleteTour
  );

module.exports = router;

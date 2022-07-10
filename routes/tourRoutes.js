const express = require('express');
const tourController = require('./../controllers/tourController');
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');

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

router.route('/stats').get(tourController.tourStats);
router.route('/report/:year').get(tourController.tourReportYear);

router.route('/').get(tourController.getAllTours).post(tourController.addTour);
router
  .route('/:id')
  .get(tourController.getTourById)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

// route("/:tourId/reviews") -> Add route
// route("/:tourId/reviews/:id") -> Update
// route("/:tourId/reviews/:id") -> One review

router
  .route('/:tourId/reviews')
  .post(
    authController.protect,
    authController.role('user'),
    reviewController.addReview
  );

module.exports = router;

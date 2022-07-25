const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');
const express = require('express');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.role(['user']),
    reviewController.addReview
  );

router
  .route('/:id')
  .get(reviewController.getReviewById)
  .patch(
    authController.protect,
    authController.role(['user']),
    reviewController.updateReview
  )
  .delete(
    authController.protect,
    authController.role(['user', 'admin']),
    reviewController.deleteReview
  );

module.exports = router;

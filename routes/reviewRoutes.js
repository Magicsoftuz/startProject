const express = require('express');

const router = express.Router({ mergeParams: true });
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');

router
  .route('/')
  .get(reviewController.getAllReview)
  .post(
    authController.protect,
    authController.role('user'),
    reviewController.setTourIdAndUserId,
    reviewController.addReview
  );

router
  .route('/:id')
  .get(reviewController.getReviewById)
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview);

module.exports = router;

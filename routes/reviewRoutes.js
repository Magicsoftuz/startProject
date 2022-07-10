const express = require('express');

const router = express.Router();
const reviewController = require('./../controllers/reviewController');

router
  .route('/')
  .get(reviewController.getAllReview)
  .post(reviewController.addReview);

router
  .route('/:id')
  .get(reviewController.getReviewById)
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview);

module.exports = router;

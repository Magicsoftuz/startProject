const reviewController = require('./../controllers/reviewController');
const express = require('express');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(reviewController.addReview);

module.exports = router;

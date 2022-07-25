// review , / rating/ userid/ tourid/ createdAt
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, 'You must enter review!'],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'users',
  },
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'tours',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

const Review = mongoose.model('reviews', reviewSchema);

module.exports = Review;

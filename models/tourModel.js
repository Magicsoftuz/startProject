const mongoose = require('mongoose');

const tourSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true],
  },
  price: Number,
  rating: Number,
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;

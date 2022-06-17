const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: String,
  price: Number,
  duration: Number,
  login: {
    type: String,
    required: true,
    minlength: 8,
    unique: true,
  },
});

const Tour = mongoose.model('tours', tourSchema);

module.exports = Tour;

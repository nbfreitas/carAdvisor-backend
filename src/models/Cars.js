const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema(
  {
    dealership: String,
    brand: String,
    model: String,
    version: String,
    year: String,
    fuel: String,
    km: String,
    value: String,
    image: String,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Cars', CarSchema);

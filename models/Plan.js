// Plan.js
// Mongoose schema for Plan

const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: String, required: true },
  details: { type: String, required: true },
  extra: { type: String, required: true },
});

module.exports = mongoose.model('Plan', planSchema); 
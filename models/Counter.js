// models/Counter.js
const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  name: { type: String, required: true },   // e.g. "carsSold"
  value: { type: Number, required: true }   // e.g. 500
});

module.exports = mongoose.model("Counter", counterSchema);

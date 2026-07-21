const mongoose = require("mongoose");

const reachUsSchema = new mongoose.Schema({
  phone: { type: String, required: true },     // e.g. "+919876543210"
  whatsapp: { type: String, required: true }   // e.g. "+919876543210"
});

module.exports = mongoose.model("ReachUs", reachUsSchema);

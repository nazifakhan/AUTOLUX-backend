const express = require("express");
const router = express.Router();
const ReachUs = require("../models/ReachUs");

// Get contact info
router.get("/", async (req, res) => {
  const info = await ReachUs.findOne(); // only one record
  res.json(info);
});

// Update contact info
router.put("/", async (req, res) => {
  const { phone, whatsapp } = req.body;
  const info = await ReachUs.findOneAndUpdate(
    {},
    { phone, whatsapp },
    { new: true, upsert: true } // create if not exists
  );
  res.json(info);
});

module.exports = router;

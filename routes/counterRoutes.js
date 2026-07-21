// routes/counterRoutes.js
const express = require("express");
const router = express.Router();
const Counter = require("../models/Counter");

// Get all counters
router.get("/", async (req, res) => {
  const counters = await Counter.find();
  res.json(counters);
});
// Delete a counter
router.delete("/:name", async (req, res) => {
  try {
    const result = await Counter.findOneAndDelete({ name: req.params.name });
    if (!result) {
      return res.status(404).json({ message: "Counter not found" });
    }
    res.json({ message: "Counter deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update or create a counter
router.put("/:name", async (req, res) => {
  const { value } = req.body;
  try {
    const counter = await Counter.findOneAndUpdate(
      { name: req.params.name },
      { value },
      { new: true, upsert: true } // <-- upsert ensures creation if not found
    );
    res.json(counter);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;

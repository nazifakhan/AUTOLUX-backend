const express = require('express');
const router = express.Router();
const Cars = require('../models/Cars');

// Create a new car
router.post('/', async (req, res) => {
  try {
    const car = new Cars(req.body);
    const savedCar = await car.save();
    // re-fetch with category populated
    const populatedCar = await Cars.findById(savedCar._id).populate('category_id', 'category_name');
    res.json(populatedCar);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read all cars
router.get('/', async (req, res) => {
  try {
    const cars = await Cars.find().populate('category_id', 'category_name');
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read featured cars
// Read all cars (optionally filter by category)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;   // read ?category=... from URL
    let query = {};

    if (category) {
      query.category_id = category;   // filter by category_id
    }

    const cars = await Cars.find(query).populate('category_id', 'category_name');
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read single car by ID
router.get('/:id', async (req, res) => {
  try {
    const car = await Cars.findById(req.params.id).populate('category_id', 'category_name');
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// carRoutes.js
router.get("/", async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query.car_name = { $regex: search, $options: "i" };
    }

    let cars = await Car.find(query);

    // Sort so exact matches or starts-with come first
    cars.sort((a, b) => {
      const q = search.toLowerCase();
      const aName = a.car_name.toLowerCase();
      const bName = b.car_name.toLowerCase();

      if (aName === q) return -1;
      if (bName === q) return 1;
      if (aName.startsWith(q) && !bName.startsWith(q)) return -1;
      if (bName.startsWith(q) && !aName.startsWith(q)) return 1;
      return aName.localeCompare(bName);
    });

    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// Update car
router.put('/:id', async (req, res) => {
  try {
    const car = await Cars.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('category_id', 'category_name');
    res.json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete car
router.delete('/:id', async (req, res) => {
  try {
    await Cars.findByIdAndDelete(req.params.id);
    res.json({ message: 'Car deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

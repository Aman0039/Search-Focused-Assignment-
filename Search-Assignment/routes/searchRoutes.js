const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');

//search the data

router.get('/', async (req, res) => {
  try {
    const { q, category, minPrice, maxPrice } = req.query;

    let filter = {};

    if (q) {
      filter.product_name = { $regex: q, $options: "i" };
    }

    if (category) {
      filter.category = category;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
      return res.status(400).json({ error: "Invalid price range" });
    }

    const results = await Inventory.find(filter);

    res.json(results);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
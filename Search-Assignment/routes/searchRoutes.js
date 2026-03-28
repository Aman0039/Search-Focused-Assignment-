const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');

// Utility: escape regex special chars
const escapeRegex = (text) => {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

// Utility: build flexible regex (handles spaces / broken typing)
const buildFlexibleRegex = (query) => {
  const cleaned = query.replace(/\s+/g, ''); // remove spaces
  const escaped = escapeRegex(cleaned);

  // Insert optional space between every character
  const pattern = escaped.split('').join('\\s*');

  return new RegExp(pattern, 'i'); // case-insensitive
};

// search route
router.get('/', async (req, res) => {
  try {
    const { q, category, minPrice, maxPrice } = req.query;

    let filter = {};

    // handlling search queries.
    if (q) {
      const regex = buildFlexibleRegex(q);
      filter.product_name = { $regex: regex };
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
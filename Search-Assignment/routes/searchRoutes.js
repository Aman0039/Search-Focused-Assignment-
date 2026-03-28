const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');

const escapeRegex = (text) => {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const buildFlexibleRegex = (query) => {
  const cleaned = String(query || '').toLowerCase().replace(/\s+/g, '');
  const escaped = escapeRegex(cleaned);
  const pattern = escaped.split('').join('.*');
  return new RegExp(pattern, 'i');
};

router.get('/', async (req, res) => {
  try {
    const { q, category, minPrice, maxPrice } = req.query;

    let filter = {};

    if (q && String(q).trim() !== '') {
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
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
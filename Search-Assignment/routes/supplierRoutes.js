const express = require('express');
const router = express.Router();
const Supplier = require('../models/Supplier');

// suplier routes 
router.post('/', async (req, res) => {
  try {
    const { name, city } = req.body;

    if (!name || !city) {
      return res.status(400).json({ error: "Name and city required" });
    }

    const supplier = new Supplier({ name, city });
    await supplier.save();

    res.json(supplier);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// all suppliers
router.get('/', async (req, res) => {
  const data = await Supplier.find();
  res.json(data);
});

module.exports = router;
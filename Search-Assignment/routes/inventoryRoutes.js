const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Inventory = require('../models/Inventory');
const Supplier = require('../models/Supplier');


//adding data in the Inventory
router.post('/', async (req, res) => {
  try {
    let { supplier_id, product_name, quantity, price, category } = req.body;

    if (!mongoose.Types.ObjectId.isValid(supplier_id)) {
      return res.status(400).json({ error: "Invalid supplier ID" });
    }

    const supplier = await Supplier.findById(supplier_id);
    if (!supplier) {
      return res.status(400).json({ error: "Supplier not found" });
    }

    const item = new Inventory({
      supplier_id,
      product_name,
      quantity,
      price,
      category
    });

    await item.save();
    res.json(item);

  } catch (err) {
    res.status(500).send(err.message);
  }
});

// get inventory data
router.get('/', async (req, res) => {
  const data = await Inventory.find().populate('supplier_id');
  res.json(data);
});

router.get('/summary', async (req, res) => {
  const result = await Inventory.aggregate([
    {
      $group: {
        _id: "$supplier_id",
        total_value: {
          $sum: { $multiply: ["$quantity", "$price"] }
        }
      }
    },
    { $sort: { total_value: -1 } }
  ]);

  res.json(result);
});

module.exports = router;
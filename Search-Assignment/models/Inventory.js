const mongoose = require('mongoose');

//inventory schema

const inventorySchema = new mongoose.Schema({
  supplier_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: true
  },
  product_name: {
    type: String,
    required: true,
    trim: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  price: {
    type: Number,
    required: true,
    min: 1
  },
  category: {
    type: String,
    trim: true,
    default: "General"
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Inventory', inventorySchema);
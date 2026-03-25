const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const supplierRoutes = require('./routes/supplierRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const searchRoutes = require('./routes/searchRoutes');

const app = express();

// Middleware to parse the data;
app.use(express.json());

// running frontend (SSR);
app.use(express.static(path.join(__dirname, 'public')));

// handlling Routes
app.use('/supplier', supplierRoutes);
app.use('/inventory', inventoryRoutes);
app.use('/search', searchRoutes);

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/inventoryDB')
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));

// Running Server
app.listen(5000, () => {
  console.log("🚀 Server running at http://localhost:5000");
});
require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const supplierRoutes = require('./routes/supplierRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const searchRoutes = require('./routes/searchRoutes');

const app = express();


// middleware to parse the json data
app.use(express.json());


//handle routes
app.use('/api/supplier', supplierRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/search', searchRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const DB_URL = process.env.MONGO_URI;

// DB connection
mongoose.connect(DB_URL);

mongoose.connection.on('connected', () => {
  console.log("MongoDB Connected");
});

mongoose.connection.on('error', (err) => {
  console.log("DB Error:", err);
});

const PORT = process.env.PORT || 5000;


//server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
"use strict";

require('dotenv').config();
var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
var path = require('path');
var arContentRoutes = require('./routes/ar-content');
var qrcodeRouter = require('./routes/qrcodeRouter');
var app = express();
app.use(cors());
var PORT = process.env.PORT || 5000;

// Kết nối MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  return console.log('Connected to MongoDB');
})["catch"](function (err) {
  return console.error('MongoDB connection error:', err);
});

// Middleware
app.use(express.json());
app.use(cors());
app.use(express["static"]('public'));
app.use('/models', express["static"](path.join(__dirname, 'public/models')));
app.use('/api', arContentRoutes);
app.use('/api', qrcodeRouter);
app.listen(PORT, function () {
  console.log("Server running at http://localhost:".concat(PORT));
});
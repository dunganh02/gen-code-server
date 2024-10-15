require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const arContentRoutes = require('./routes/ar-content');
const qrcodeRouter = require('./routes/qrcodeRouter');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

// Kết nối MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json())
app.use(cors());
app.use(express.static('public'));
app.use('/models', express.static(path.join(__dirname, 'public/models')));
app.use('/api', arContentRoutes);
app.use('/api', qrcodeRouter);

app.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}`)
})
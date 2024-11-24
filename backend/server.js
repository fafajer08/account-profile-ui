// /server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userProfileRoutes = require('./routes/userProfile');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// Routes
app.use('/api', userProfileRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Start server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

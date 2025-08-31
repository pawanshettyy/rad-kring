// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');

require('dotenv').config();
const connectDB = require('./config/database');


// Connect to database
connectDB();

const app = express();
app.use(cors());
app.use(express.json());


// Import routes
const careersRoutes = require('./routes/careersRoutes');
const contactRoutes = require('./routes/contactRoutes');
const preorderRoutes = require('./routes/preorderRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');

app.use('/api/careers', careersRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/preorder', preorderRoutes);
app.use('/api/newsletter', newsletterRoutes);

const PORT = process.env.PORT || 5000;
// Root route for Render health check and browser visits
app.get('/', (req, res) => {
  res.send('Backend is running!');
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

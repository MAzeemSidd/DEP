require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const propertyRoutes = require('./routes/propertyRoutes');

console.log('DB_USER:', process.env.DB_USER);   // Should print 'root'
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);   // Should print 'root123'

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', authRoutes);
app.use('/api', propertyRoutes);

// Start the server
const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

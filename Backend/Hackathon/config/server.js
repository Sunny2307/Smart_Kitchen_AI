const express = require('express');
const app = express();

// Import routes
const wasteRoutes = require('./routes/wasteRoutes');

// Middleware
app.use(express.json());

// Mount routes
app.use('/api/waste', wasteRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
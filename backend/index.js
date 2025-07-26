const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// route imports...
const vehicleRoutes = require('./src/routes/vehicleRoutes');
const authRoutes = require('./src/routes/authRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const maintenanceRoutes = require('./src/routes/maintenanceRoutes');
const customerRoutes = require('./src/routes/customerRoutes');


const app = express();
connectDB();
require('./src/models'); // run all models from src/models

// Middlewares
app.use(cors()); 
app.use(express.json());

// Routes
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/customers', customerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

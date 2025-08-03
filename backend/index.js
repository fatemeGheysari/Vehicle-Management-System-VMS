import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';

// Route imports
import vehicleRoutes from './src/routes/vehicleRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import categoryRoutes from './src/routes/categoryRoutes.js';
import maintenanceRoutes from './src/routes/maintenanceRoutes.js';
import customerRoutes from './src/routes/customerRoutes.js';
import billRoutes from './src/routes/billRoutes.js';

import './src/models/index.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/bills', billRoutes);


// Only connect to DB and listen when NOT testing
if (process.env.NODE_ENV !== 'test') {
    connectDB();

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

export default app;

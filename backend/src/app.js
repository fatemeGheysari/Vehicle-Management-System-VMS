import express from 'express';
import cors from 'cors';
import { authMiddleware } from './middlewares/authMiddleware.js';

import authRoutes from './routes/authRoutes.js';
import vehicleRoutes from './routes/vehicleRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import maintenanceRoutes from './routes/maintenanceRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import billRoutes from './routes/billRoutes.js';
import invoiceRoutes from './routes/invoiceRoutes.js';
import partRoutes from './routes/partRoutes.js';

import './models/index.js';

const app = express();

// Middleware
// Strict CORS: allow only localhost (dev) and your Vercel domain
const allowedOrigins = [
    "http://localhost:5173",                          // Vite dev
    "https://vehicle-management-system-vms.vercel.app" // Vercel frontend
];

app.use(
    cors({
        // Decide which origins are allowed
        origin(origin, callback) {
            // Allow server-to-server tools (no origin) like Postman/curl
            if (!origin) return callback(null, true);
            return allowedOrigins.includes(origin)
                ? callback(null, true)
                : callback(new Error("Not allowed by CORS"));
        },
        credentials: true, // allow cookies/Authorization header
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// Handle preflight requests quickly
app.options(/.*/, cors());

// Parse JSON bodies
app.use(express.json());

app.use(express.json());

//Routes without authentication
app.use('/api/auth', authRoutes);

// Routes with authentication
app.use('/api', authMiddleware);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/parts', partRoutes);

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

export default app;

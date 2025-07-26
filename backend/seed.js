const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

const User = require('./src/models/User');
const Customer = require('./src/models/Customer');
const VehicleCategory = require('./src/models/VehicleCategory');
const Vehicle = require('./src/models/Vehicle');
const MaintenanceRecord = require('./src/models/MaintenanceRecord');

const MONGO_URI = process.env.MONGO_URI;

const seed = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅ Connected to MongoDB");

        await User.deleteMany();
        await Customer.deleteMany();
        await VehicleCategory.deleteMany();
        await Vehicle.deleteMany();
        await MaintenanceRecord.deleteMany();

        const hashedPassword1 = await bcrypt.hash("admin123", 10);
        const hashedPassword2 = await bcrypt.hash("user123", 10);

        const users = await User.insertMany([
            { username: "admin", email: "admin@example.com", passwordHash: hashedPassword1, role: "admin" },
            { username: "user1", email: "user1@example.com", passwordHash: hashedPassword2, role: "user" },
        ]);

        const customers = await Customer.insertMany([
            {
                firstName: "Ali",
                lastName: "Ahmadi",
                phone: "09123456789",
                email: "ali@example.com",
                address: "Tehran, Iran",
            },
            {
                firstName: "Sara",
                lastName: "Karimi",
                phone: "09352221100",
                email: "sara@example.com",
                address: "Shiraz, Iran",
            },
        ]);

        const categories = await VehicleCategory.insertMany([
            { name: "Sedan", description: "Comfortable family cars" },
            { name: "SUV", description: "Sport Utility Vehicles" },
        ]);

        const vehicles = await Vehicle.insertMany([
            {
                plateNumber: "B-MW1234",
                brand: "BMW",
                model: "X5",
                year: 2021,
                categoryId: categories[1]._id,
                ownerId: customers[0]._id,
            },
            {
                plateNumber: "HH-TO5678",
                brand: "Toyota",
                model: "Corolla",
                year: 2019,
                categoryId: categories[0]._id,
                ownerId: customers[1]._id,
            },
        ]);

        await MaintenanceRecord.insertMany([
            {
                vehicleId: vehicles[0]._id,
                description: "Oil change",
                mileage: 30000,
                serviceDate: new Date("2024-06-15"),
                cost: 5600000,
            },
            {
                vehicleId: vehicles[1]._id,
                description: "Brake inspection",
                mileage: 45000,
                serviceDate: new Date("2024-07-05"),
                cost: 500000,
            },
        ]);

        console.log("🌱 Seed data successfully inserted.");
        process.exit();
    } catch (err) {
        console.error("❌ Seeding failed:", err);
        process.exit(1);
    }
};

seed();

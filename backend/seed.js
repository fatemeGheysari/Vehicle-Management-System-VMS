// backend/seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";

import User from "./src/models/User.js";
import Customer from "./src/models/Customer.js";
import VehicleCategory from "./src/models/VehicleCategory.js";
import Vehicle from "./src/models/Vehicle.js";
import MaintenanceRecord from "./src/models/MaintenanceRecord.js";
import Bill from "./src/models/Bill.js";
import Part from "./src/models/Part.js";
import Invoice from "./src/models/Invoice.js";

dotenv.config();

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to MongoDB Atlas");

        // پاک کردن داده‌های قبلی
        await Promise.all([
            User.deleteMany(),
            Customer.deleteMany(),
            VehicleCategory.deleteMany(),
            Vehicle.deleteMany(),
            MaintenanceRecord.deleteMany(),
            Bill.deleteMany(),
            Part.deleteMany(),
            Invoice.deleteMany()
        ]);
        console.log("🗑 Old data cleared");

        // 1. ادمین
        await User.create({
            username: "admin",
            passwordHash: "admin123",
            role: "admin"
        });

        // 2. مشتری‌ها
        const customersData = Array.from({ length: 10 }).map((_, i) => ({
            firstName: `Customer${i + 1}`,
            lastName: `Test${i + 1}`,
            phone: `09120000${(100 + i).toString().slice(-3)}`,
            email: `customer${i + 1}@example.com`,
            address: `City ${i + 1}`
        }));
        const customers = await Customer.insertMany(customersData);

        // 3. دسته‌بندی خودرو
        const categories = await VehicleCategory.insertMany([
            { name: "Sedan" },
            { name: "SUV" },
            { name: "Truck" },
            { name: "Van" }
        ]);

        // 4. خودروها
        const vehiclesData = customers.map((customer, i) => ({
            plateNumber: `${10 + i}A${10000 + i}`,
            brand: ["Toyota", "Hyundai", "Volvo", "Honda", "Kia"][i % 5],
            model: ["Corolla", "Tucson", "FH16", "Civic", "Sportage"][i % 5],
            year: 2015 + (i % 10),
            categoryId: categories[i % categories.length]._id,
            ownerId: customer._id
        }));
        const vehicles = await Vehicle.insertMany(vehiclesData);

        // 5. قطعات
        const parts = await Part.insertMany([
            { name: "Brake Pads", quantity: 100, price: 300000 },
            { name: "Oil Filter", quantity: 200, price: 150000 },
            { name: "Air Filter", quantity: 150, price: 180000 },
            { name: "Spark Plug", quantity: 300, price: 120000 },
            { name: "Battery", quantity: 50, price: 2500000 }
        ]);

        // 6. ایجاد تعمیرات، فاکتور، اینویس برای هر خودرو
        for (let i = 0; i < vehicles.length; i++) {
            const services = [
                { description: "Oil Change", cost: 500000 + i * 10000 },
                { description: "Brake Replacement", cost: 800000 + i * 15000 }
            ];

            const maintenance = await MaintenanceRecord.create({
                vehicleId: vehicles[i]._id,
                serviceDate: new Date(Date.now() - i * 86400000),
                services,
                partsUsed: [parts[i % parts.length]._id]
            });

            const billServices = services.map(s => ({
                description: s.description,
                price: s.cost
            }));
            const totalPrice = billServices.reduce((sum, s) => sum + s.price, 0);

            await Bill.create({
                vehicle: vehicles[i]._id,
                customer: customers[i]._id,
                maintenanceId: maintenance._id,
                services: billServices,
                totalPrice,
                date: new Date(Date.now() - i * 86400000)
            });

            await Invoice.create({
                customerId: customers[i]._id,
                vehicleId: vehicles[i]._id,
                date: new Date(Date.now() - i * 86400000),
                total: totalPrice,
                services
            });
        }

        console.log("🚀 Seed data inserted successfully with 10 records");
        process.exit(0);
    } catch (error) {
        console.error("❌ Seeding error:", error);
        process.exit(1);
    }
}

seed();

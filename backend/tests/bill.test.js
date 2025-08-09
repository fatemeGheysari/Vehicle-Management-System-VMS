import request from 'supertest';
import app from '../src/app.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;
let token;
let createdBillId;

// Setup before all tests
beforeAll(async () => {
    // Start an in-memory MongoDB instance
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);

    // Generate a test JWT token
    const testUser = { id: 'testuserid123' };
    token = jwt.sign(testUser, process.env.JWT_SECRET || 'your-secret-key');
});

// Cleanup after all tests
afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
});

describe('Bill API (GET, POST, DELETE)', () => {
    // Test GET: should return an empty array initially
    it('should return an empty array [GET]', async () => {
        const res = await request(app)
            .get('/api/bills')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(0);
    });

    // Test POST: create a new bill
    it('should create a new bill [POST]', async () => {
        const fakeCustomerId = new mongoose.Types.ObjectId().toString();
        const fakeVehicleId = new mongoose.Types.ObjectId().toString();

        const res = await request(app)
            .post('/api/bills')
            .set('Authorization', `Bearer ${token}`)
            .send({
                customer: fakeCustomerId,
                vehicle: fakeVehicleId,
                services: [
                    { description: 'Oil Change', price: 120 },
                    { description: 'Tire Rotation', price: 80 },
                ],
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.totalPrice).toBe(200);

        // Save the ID for the delete test
        createdBillId = res.body._id;
    });

    // Test DELETE: remove the created bill
    it('should delete the created bill [DELETE]', async () => {
        const res = await request(app)
            .delete(`/api/bills/${createdBillId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toMatch(/deleted/i);
    });

    // Test GET again: should be empty after deletion
    it('should return empty array again after deletion [GET]', async () => {
        const res = await request(app)
            .get('/api/bills')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(0);
    });
});

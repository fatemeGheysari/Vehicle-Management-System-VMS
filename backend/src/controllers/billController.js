import Bill from '../models/Bill.js';

export const createBill = async (req, res) => {
    try {
        const { customer, vehicle, services } = req.body;

        if (!services || services.length === 0) {
            return res.status(400).json({ message: 'No services provided' });
        }

        const totalPrice = services.reduce((sum, item) => sum + item.price, 0);

        const newBill = await Bill.create({
            customer,
            vehicle,
            services,
            totalPrice,
        });

        res.status(201).json(newBill);
    } catch (err) {
        console.error('Create Bill Error:', err);
        res.status(500).json({ message: 'Failed to create bill' });
    }
};

export const getAllBills = async (req, res) => {
    try {
        const bills = await Bill.find()
            .populate('customer', 'firstName lastName')
            .populate('vehicle', 'model plateNumber');

        res.status(200).json(bills);
    } catch (err) {
        console.error('Fetch Bills Error:', err);
        res.status(500).json({ message: 'Failed to fetch bills' });
    }
};

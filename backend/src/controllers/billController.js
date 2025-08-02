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

export const getBillById = async (req, res) => {
    try {
        const bill = await Bill.findById(req.params.id)
            .populate('customer')
            .populate('vehicle');

        if (!bill) {
            return res.status(404).json({ message: 'Bill not found' });
        }

        res.json(bill);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateBill = async (req, res) => {
    try {
        const { customer, vehicle, services, totalPrice } = req.body;

        const updatedBill = await Bill.findByIdAndUpdate(
            req.params.id,
            { customer, vehicle, services, totalPrice },
            { new: true }
        );

        if (!updatedBill) {
            return res.status(404).json({ message: 'Bill not found' });
        }

        res.json(updatedBill);
    } catch (err) {
        console.error('Update Bill Error:', err);
        res.status(500).json({ message: 'Failed to update bill' });
    }
};

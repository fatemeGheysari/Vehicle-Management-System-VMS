import Bill from '../models/Bill.js';
import MaintenanceRecord from '../models/MaintenanceRecord.js';
import Vehicle from '../models/Vehicle.js';

export const createBill = async (req, res) => {
    try {
        const { customer, vehicle, services, date, maintenanceId, partsUsed = [] } = req.body;
        if (!services?.length) return res.status(400).json({ message: 'No services provided' });

        const totalPrice = services.reduce((sum, item) => sum + item.price, 0);


        let maintenanceRef = maintenanceId;
        if (maintenanceRef) {
            await MaintenanceRecord.findByIdAndUpdate(maintenanceRef, { partsUsed });
        } else {
            const newMaint = await MaintenanceRecord.create({
                vehicleId: vehicle,
                serviceDate: date || new Date(),
                services: services.map(s => ({ description: s.description, cost: s.price })),
                partsUsed
            });
            maintenanceRef = newMaint._id;
        }

        const newBill = await Bill.create({
            customer, vehicle, services, totalPrice, date, maintenanceId: maintenanceRef
        });
        const populated = await Bill.findById(newBill._id)
            .populate('customer', 'firstName lastName')
            .populate('vehicle', 'model plateNumber brand')
            .populate({ path: 'maintenanceId', populate: { path: 'partsUsed' } });

        res.status(201).json(populated);
    } catch (err) {
        console.error('❌ Create Bill Error:', err);
        res.status(500).json({ message: 'Failed to create bill', error: err.message });
    }
};


export const getAllBills = async (req, res) => {
    try {
        const bills = await Bill.find({ archived: false })
            .populate('customer', 'firstName lastName')
            .populate('vehicle', 'model plateNumber')
            .populate({
                path: 'maintenanceId',
                populate: { path: 'partsUsed' }
            });

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
            .populate('vehicle')
            .populate({ path: 'maintenanceId', populate: { path: 'partsUsed' } });

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
        const { customer, vehicle, services = [], totalPrice, maintenanceId, partsUsed = [], date } = req.body;

        const updatedBill = await Bill.findByIdAndUpdate(
            req.params.id,
            { customer, vehicle, services, totalPrice, ...(date ? { date } : {}) },
            { new: true }
        );

        if (!updatedBill) return res.status(404).json({ message: 'Bill not found' });

        if (maintenanceId) {
            await MaintenanceRecord.findByIdAndUpdate(
                maintenanceId,
                {
                    ...(date ? { serviceDate: date } : {}),
                    services: services.map(s => ({ description: s.description, cost: s.price })),
                    partsUsed
                },
                { new: true }
            );
        }

        const populated = await Bill.findById(updatedBill._id)
            .populate('customer', 'firstName lastName')
            .populate('vehicle', 'model plateNumber brand')
            .populate({ path: 'maintenanceId', populate: { path: 'partsUsed' } });

        res.json(populated);
    } catch (err) {
        console.error('Update Bill Error:', err);
        res.status(500).json({ message: 'Failed to update bill' });
    }
};

export const deleteBill = async (req, res) => {
    try {
        const bill = await Bill.findByIdAndDelete(req.params.id);
        if (!bill) {
            return res.status(404).json({ message: 'Bill not found' });
        }
        res.json({ message: 'Bill deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// GET /api/bills/by-maintenance/:maintenanceId
export const getBillByMaintenanceId = async (req, res) => {
    try {
        const bill = await Bill.findOne({ maintenanceId: req.params.maintenanceId, archived: false })
            .populate("vehicle")
            .populate("customer")
            .populate({
                path: "maintenanceId",
                populate: { path: "partsUsed" }
            });

        if (!bill) {
            return res.status(404).json({ message: "Invoice not found for this maintenance" });
        }

        res.json(bill);
    } catch (error) {
        console.error("❌ Error fetching bill by maintenanceId:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getArchivedBills = async (req, res) => {
    try {
        console.log("📥 Request received for archived bills");

        const bills = await Bill.find({ archived: true })
            .populate("vehicle", "model plateNumber")
            .populate("customer", "firstName lastName")
            .populate({
                path: "maintenanceId",
                populate: { path: "partsUsed" }
            });

        console.log("✅ Bills found:", bills);

        res.json(bills);
    } catch (err) {
        console.error("❌ Error fetching archived bills:", err);
        res.status(500).json({ message: err.message });
    }
};

// PATCH /api/bills/:id/archive
export const archiveBill = async (req, res) => {
    try {
        const updated = await Bill.findByIdAndUpdate(req.params.id, { archived: true }, { new: true });
        if (!updated) return res.status(404).json({ message: "Bill not found" });
        res.json(updated);
    } catch (err) {
        console.error("❌ Archive Bill Error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

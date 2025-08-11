import Invoice from "../models/Invoice.js";

export const getAllInvoices = async (req, res) => {
    try {
        const { customerId, vehicleId } = req.query;

        const filter = {};
        if (customerId) filter.customerId = customerId;
        if (vehicleId) filter.vehicleId = vehicleId;

        const invoices = await Invoice.find(filter)
            .populate({ path: "customerId", select: "firstName lastName", strictPopulate: false })
            .populate({ path: "vehicleId", select: "plateNumber", strictPopulate: false });

        res.json(invoices);
    } catch (error) {
        console.error("Error fetching invoices:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

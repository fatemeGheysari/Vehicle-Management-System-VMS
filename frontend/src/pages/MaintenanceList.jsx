import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import { AnimatePresence, motion } from "framer-motion";
import ConfirmModal from "../components/ConfirmModal";
import AddMaintenanceModal from "../components/AddMaintenanceModal";
import toast from "react-hot-toast";

export default function MaintenanceList() {
    const [records, setRecords] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [expandedId, setExpandedId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState(null);

    const fetchRecords = async () => {
        try {
            const res = await axios.get("/api/maintenance");
            console.log("Fetched records:", res.data);
            setRecords(res.data);
        } catch (err) {
            toast.error("Failed to fetch maintenance records");
        }
    };

    const fetchVehicles = async () => {
        try {
            const res = await axios.get("/api/vehicles");
            setVehicles(res.data);
        } catch (err) {
            toast.error("Failed to fetch vehicles");
        }
    };

    useEffect(() => {
        fetchRecords();
        fetchVehicles();
    }, []);

    const toggleExpand = (id) => {
        setExpandedId(prev => (prev === id ? null : id));
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/maintenance/${recordToDelete._id}`);
            setRecords(prev => prev.filter(r => r._id !== recordToDelete._id));
            toast.success("Record deleted successfully");
            setConfirmVisible(false);
        } catch (err) {
            toast.error("Failed to delete record");
        }
    };

    const handleAdd = (newRecord) => {
        setRecords(prev => [...prev, newRecord]);
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-8">🛠️ Maintenance Records</h1>

            <div className="flex justify-end mb-6">
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    ➕ Add Maintenance
                </button>
            </div>

            <ul className="space-y-4">
                {records.map(record => {
                    console.log("Record ID:", record._id);
                    console.log("Full Record:", record);

                    const isOpen = expandedId === record._id;
                    const vehicle = record.vehicleId;

                    return (
                        <li key={record._id} className="bg-white border rounded shadow">
                            <button
                                onClick={() => toggleExpand(record._id)}
                                className="w-full flex justify-between items-center px-4 py-3 hover:bg-gray-100 transition"
                            >
                                <div className="font-medium text-lg">
                                    {isOpen ? "➖" : "➕"} {vehicle?.brand || "Unknown"} {vehicle?.model || ""}
                                </div>
                            </button>

                            <AnimatePresence mode="wait">
                                {isOpen && (
                                    <motion.div
                                        key={`motion-${record._id}`}
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="px-6 pb-4 pt-2 text-sm text-gray-700"
                                    >
                                        <p><strong>🆔 Plate:</strong> {vehicle.plateNumber}</p>
                                        <p><strong>📅 Date:</strong> {new Date(record.serviceDate).toLocaleDateString()}</p>
                                        <p><strong>📝 Description:</strong> {record.description}</p>
                                        <p><strong>📍 Mileage:</strong> {record.mileage} km</p>
                                        <p><strong>💰 Cost:</strong> €{record.cost}</p>
                                        <p><strong>🔧 Parts Used:</strong> {record.partsUsed || "None"}</p>

                                        <div className="flex gap-3 mt-4">
                                            <button
                                                onClick={() => {
                                                    setRecordToDelete(record);
                                                    setConfirmVisible(true);
                                                }}
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                            >
                                                🗑️ Delete
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                        </li>
                    );
                })}
            </ul>

            {/* Add Modal */}
            <AddMaintenanceModal
                visible={showModal}
                onClose={() => setShowModal(false)}
                vehicles={vehicles}
                onSave={handleAdd}
            />

            {/* Confirm Modal */}
            <ConfirmModal
                visible={confirmVisible}
                title="Delete Record"
                message="Are you sure you want to delete this maintenance record?"
                onConfirm={handleDelete}
                onCancel={() => setConfirmVisible(false)}
            />
        </div>
    );
}

import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import AddMaintenanceModal from "../components/AddMaintenanceModal";


export default function MaintenanceList() {
    const [records, setRecords] = useState([]);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [recordsRes, vehiclesRes] = await Promise.all([
                    axios.get("/api/maintenance"),
                    axios.get("/api/vehicles"),
                ]);
                setRecords(recordsRes.data);
                setVehicles(vehiclesRes.data);
            } catch (err) {
                setError("❌ Failed to fetch data: " + (err.response?.data?.message || err.message));
            }
        };

        fetchData();
    }, []);

    const handleAdd = async (newRecord) => {
        try {
            const res = await axios.post("/api/maintenance", newRecord);
            setRecords(prev => [res.data, ...prev]);
        } catch (err) {
            setError("❌ Failed to add record: " + (err.response?.data?.message || err.message));
        }
    };


    return (
        <div className="max-w-4xl mx-auto px-6 py-10">
            <h1 className="text-2xl font-bold mb-6">🛠️ Maintenance Records</h1>

            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="flex justify-end mb-4">
                <button onClick={() => setShowModal(true)} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                    ➕ Add Maintenance
                </button>
            </div>

            <div className="space-y-4">
                {records.map((rec) => (
                    <div key={rec._id} className="bg-white rounded shadow p-4 hover:shadow-md transition">
                        <p className="font-semibold text-lg">{rec.vehicleId?.brand} {rec.vehicleId?.model}</p>
                        <p className="text-sm text-gray-600">🗓️ {new Date(rec.serviceDate).toLocaleDateString()}</p>
                        <p className="mt-2">{rec.description}</p>
                        <p className="text-sm text-gray-500">📍 Mileage: {rec.mileage} km</p>
                        <p className="text-sm text-gray-500">💰 Cost: ${rec.cost}</p>
                        {rec.partsUsed && <p className="text-sm text-gray-500">🔧 Parts: {rec.partsUsed}</p>}
                    </div>
                ))}
            </div>
            <AddMaintenanceModal
                visible={showModal}
                onClose={() => setShowModal(false)}
                onSave={handleAdd}
                vehicles={vehicles}
            />

        </div>
    );
}

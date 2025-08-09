import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";

export default function AddMaintenanceModal({ visible, onClose, onSave, vehicles }) {
    const defaultForm = {
        vehicleId: "",
        serviceDate: new Date().toISOString().split("T")[0],
        services: [],
        partsUsed: []
    };

    const [form, setForm] = useState(defaultForm);
    const [availableParts, setAvailableParts] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchParts = async () => {
            try {
                const res = await axios.get("/api/parts");
                setAvailableParts(res.data);
            } catch (err) {
                console.error("❌ Failed to load parts:", err);
            }
        };
        fetchParts();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const _handlePartsChange = (e) => {
        const selected = Array.from(e.target.selectedOptions, option => option.value);
        setForm(prev => ({ ...prev, partsUsed: selected }));
    };

    const addService = () => {
        setForm(prev => ({
            ...prev,
            services: [...prev.services, { description: "", cost: "" }]
        }));
    };

    const updateService = (index, field, value) => {
        const updated = [...form.services];
        updated[index][field] = field === "cost" ? parseInt(value) : value;
        setForm(prev => ({ ...prev, services: updated }));
    };

    const removeService = (index) => {
        const updated = form.services.filter((_, i) => i !== index);
        setForm(prev => ({ ...prev, services: updated }));
    };

    const handleSubmit = async () => {
        if (!form.vehicleId || form.services.length === 0) {
            console.log("📤 Data to submit:", form);
            setErrorMessage("Please select a vehicle and add at least one service.");
            return;
        }

        try {
            const res = await axios.post("/api/maintenance", form);
            onSave(res.data);
            setForm(defaultForm);
            onClose();
        } catch (err) {
            console.error("❌ Failed to submit:", err);
            setErrorMessage("Submission failed.");
        }
    };

    const handleCancel = () => {
        setForm(defaultForm);
        onClose();
    };

    if (!visible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-[500px] space-y-4 max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl text-center font-bold">➕ Add Maintenance</h2>

                {errorMessage && <div className="text-red-600">{errorMessage}</div>}

                <select name="vehicleId" value={form.vehicleId} onChange={handleChange} className="w-full border p-2 rounded">
                    <option value="">-- Select Vehicle --</option>
                    {vehicles.map(v => (
                        <option key={v._id} value={v._id}>
                            {v.brand} {v.model} ({v.plateNumber})
                        </option>
                    ))}
                </select>

                <input
                    name="serviceDate"
                    type="date"
                    value={form.serviceDate}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                {/* Services Section */}
                <div>
                    <h4 className="font-semibold mb-2">Services:</h4>
                    {form.services.map((srv, idx) => (
                        <div key={idx} className="flex gap-2 mb-2">
                            <input
                                value={srv.description}
                                onChange={(e) => updateService(idx, "description", e.target.value)}
                                placeholder="Description"
                                className="flex-1 border p-2 rounded"
                            />
                            <input
                                type="number"
                                value={srv.cost}
                                onChange={(e) => updateService(idx, "cost", e.target.value)}
                                placeholder="Cost"
                                className="w-24 border p-2 rounded"
                            />
                            <button onClick={() => removeService(idx)} className="text-red-600 hover:text-red-800">🗑️</button>
                        </div>
                    ))}
                    <button onClick={addService} className="text-blue-600 hover:underline mt-1">+ Add Service</button>
                </div>

                {/* Parts Section */}
                <div>
                    <h4 className="font-semibold mb-2">Parts Used:</h4>
                    <div className="max-h-40 overflow-y-auto space-y-1 border p-2 rounded">
                        {availableParts.map(part => (
                            <label key={part._id} className="flex items-center gap-2 text-sm">
                                <input
                                    type="checkbox"
                                    checked={form.partsUsed.includes(part._id)}
                                    onChange={() => {
                                        const exists = form.partsUsed.includes(part._id);
                                        const updated = exists
                                            ? form.partsUsed.filter(id => id !== part._id)
                                            : [...form.partsUsed, part._id];
                                        setForm(prev => ({ ...prev, partsUsed: updated }));
                                    }}
                                />
                                <span>{part.name}</span>
                            </label>
                        ))}
                    </div>

                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2 pt-2">
                    <button onClick={handleCancel} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
                </div>
            </div>
        </div>
    );
}

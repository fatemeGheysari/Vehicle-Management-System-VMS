import { useState } from "react";

export default function AddMaintenanceModal({ visible, onClose, onSave, vehicles }) {
    const [form, setForm] = useState({
        vehicleId: "",
        serviceDate: "",
        description: "",
        mileage: "",
        cost: "",
        partsUsed: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        onSave({ ...form, mileage: parseInt(form.mileage), cost: parseInt(form.cost) });
        onClose();
    };

    if (!visible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-96 space-y-4">
                <h2 className="text-xl text-center font-bold"> Add Maintenance</h2>

                <select name="vehicleId" value={form.vehicleId} onChange={handleChange} className="w-full border p-2 rounded">
                    <option value="">-- Select Vehicle --</option>
                    {vehicles.map(v => (
                        <option key={v._id} value={v._id}>
                            {v.brand} {v.model}
                        </option>
                    ))}
                </select>

                <input name="serviceDate" type="date" value={form.serviceDate} onChange={handleChange} className="w-full border p-2 rounded" />
                <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border p-2 rounded" />
                <input name="mileage" type="number" value={form.mileage} onChange={handleChange} placeholder="Mileage" className="w-full border p-2 rounded" />
                <input name="cost" type="number" value={form.cost} onChange={handleChange} placeholder="Cost" className="w-full border p-2 rounded" />
                <input name="partsUsed" value={form.partsUsed} onChange={handleChange} placeholder="Parts Used" className="w-full border p-2 rounded" />

                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
                </div>
            </div>
        </div>
    );
}

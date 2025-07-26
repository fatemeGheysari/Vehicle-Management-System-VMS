// OwnerModal.jsx
import { useState } from "react";

export default function OwnerModal({ visible, onClose, onSave, existingOwners = [] }) {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        address: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        setError("");

        if (!form.firstName.trim() || !form.email.trim() || !form.phone.trim() || !form.address.trim()) {
            setError("Please fill all required fields.");
            return;
        }

        const duplicateEmail = existingOwners.some(owner => owner.email === form.email);
        if (duplicateEmail) {
            setError("❌This email is already in use.");
            return;
        }

        onSave(form);
        setForm({ firstName: "", lastName: "", phone: "", email: "", address: "" });
    };

    if (!visible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-xl font-bold mb-4">Add New Owner</h2>

                <input
                    name="firstName"
                    placeholder="First Name"
                    value={form.firstName}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded mb-2"
                    required
                />
                <input
                    name="lastName"
                    placeholder="Last Name"
                    value={form.lastName}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded mb-2"
                />
                <input
                    name="phone"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded mb-2"
                    required
                />
                <input
                    name="address"
                    placeholder="Address"
                    value={form.address}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded mb-2"
                    required
                />
                <input
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded mb-4"
                    required
                />

                {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

                <div className="flex justify-end space-x-2">
                    <button onClick={onClose} className="bg-gray-300 text-black px-4 py-2 rounded">Cancel</button>
                    <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Save</button>
                </div>
            </div>
        </div>
    );
}

import { useState } from "react";

export default function CategoryModal({ visible, onClose, onSave }) {
    const [name, setName] = useState("");

    const handleSave = () => {
        if (!name.trim()) return;
        onSave(name);
        setName("");
    };

    if (!visible) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-xl font-bold mb-4">Add New Category</h2>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Category Name"
                    className="w-full border px-3 py-2 rounded mb-4"
                />
                <div className="flex justify-end space-x-2">
                    <button onClick={onClose} className="bg-gray-300 text-black px-4 py-2 rounded">Cancel</button>
                    <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save</button>
                </div>
            </div>
        </div>
    );
}
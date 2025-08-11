// src/pages/AddPartOrder.jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";

export default function AddPartOrder() {
    // Get part id from route params
    const { id } = useParams();
    const navigate = useNavigate();

    // Local form state
    const [form, setForm] = useState({
        supplier: "",
        amount: "",
        notes: "",
        orderDate: new Date().toISOString().split("T")[0],
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await axios.post(`/api/parts/${id}/order`, {
                supplier: form.supplier,
                amount: Number(form.amount),
                notes: form.notes,
                orderDate: form.orderDate,
            });

            // Navigate to a suitable page after success
            navigate("/invoices"); // change if you want another page
        } catch (err) {
            setError(err.response?.data?.message || "Failed to order part");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white shadow rounded">
            <h1 className="text-xl font-bold mb-4">Order Part</h1>
            {error && <p className="text-red-500 mb-2">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                    <label className="block text-sm font-medium">Supplier</label>
                    <input
                        type="text"
                        name="supplier"
                        value={form.supplier}
                        onChange={handleChange}
                        className="border rounded w-full p-2"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Amount</label>
                    <input
                        type="number"
                        name="amount"
                        value={form.amount}
                        onChange={handleChange}
                        className="border rounded w-full p-2"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Order Date</label>
                    <input
                        type="date"
                        name="orderDate"
                        value={form.orderDate}
                        onChange={handleChange}
                        className="border rounded w-full p-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Notes</label>
                    <textarea
                        name="notes"
                        value={form.notes}
                        onChange={handleChange}
                        className="border rounded w-full p-2"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {loading ? "Saving..." : "Submit Order"}
                </button>
            </form>
        </div>
    );
}

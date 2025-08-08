import { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import toast from "react-hot-toast";

export default function InvoicesPage() {
    const [invoices, setInvoices] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState("");

    const fetchInvoices = async () => {
        try {
            const res = await axios.get("/api/bills");
            setInvoices(res.data);
            setFiltered(res.data);
        } catch (err) {
            toast.error("Failed to fetch invoices");
        }
    };

    useEffect(() => {
        fetchInvoices();
    }, []);

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearch(term);

        const results = invoices.filter(inv =>
            inv.vehicle?.plateNumber?.toLowerCase().includes(term) ||
            `${inv.customer?.firstName} ${inv.customer?.lastName}`.toLowerCase().includes(term) ||
            inv.description?.toLowerCase().includes(term)
        );
        setFiltered(results);
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6">🧾 Service Invoices</h1>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by plate number, customer, description..."
                    value={search}
                    onChange={handleSearch}
                    className="w-full border p-2 rounded"
                />
            </div>

            <div className="overflow-auto rounded shadow border">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3">No.</th>
                            <th className="p-3">Plate</th>
                            <th className="p-3">Customer</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Amount (€)</th>
                            <th className="p-3">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((inv, index) => (
                            <tr key={inv._id} className="border-b hover:bg-gray-50 transition">
                                <td className="p-3">{index + 1}</td>
                                <td className="p-3">{inv.vehicle?.plateNumber || "—"}</td>
                                <td className="p-3">
                                    {inv.customer
                                        ? `${inv.customer.firstName} ${inv.customer.lastName}`
                                        : "—"}
                                </td>
                                <td className="p-3">{new Date(inv.date).toLocaleDateString()}</td>
                                <td className="p-3">{inv.totalPrice.toLocaleString()} €</td>
                                <td className="p-3">
                                    <ul className="list-disc pl-5 mt-2">
                                        {inv.services.map((srv, idx) => (
                                            <li key={idx}>
                                                {srv.description} — {srv.price.toLocaleString()} €
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center p-4 text-gray-400">
                                    No results found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

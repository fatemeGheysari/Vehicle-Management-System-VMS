import React, { useEffect, useState, useRef } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const InvoiceList = () => {
    const [bills, setBills] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [selectedVehicle, setSelectedVehicle] = useState('');
    const [printBill, setPrintBill] = useState(null);
    const printRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [billRes, custRes, vehRes] = await Promise.all([
                    axiosInstance.get('/api/bills'),
                    axiosInstance.get('/api/customers'),
                    axiosInstance.get('/api/vehicles'),
                ]);
                setBills(billRes.data);
                setCustomers(custRes.data);
                setVehicles(vehRes.data);
            } catch (error) {
                toast.error(`Failed to load invoices: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredBills = bills.filter((bill) => {
        const matchCustomer = selectedCustomer ? bill.customer?._id === selectedCustomer : true;
        const matchVehicle = selectedVehicle ? bill.vehicle?._id === selectedVehicle : true;
        return matchCustomer && matchVehicle;
    });

    const handleArchive = async (id) => {
        const confirmed = window.confirm('Are you sure you want to archive this invoice?');
        if (!confirmed) return;

        try {
            await axiosInstance.patch(`/api/bills/${id}/archive`);
            toast.success('Invoice archived successfully');
            setBills((prev) => prev.filter((b) => b._id !== id));
        } catch (err) {
            toast.error(`Failed to archive invoice: ${err.message}`);
        }
    };

    const handlePrint = (bill) => {
        setPrintBill(bill);
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-10"> 📄 Invoice List</h1>

            <div className="flex gap-4 mb-6">
                <select value={selectedCustomer} onChange={(e) => setSelectedCustomer(e.target.value)} className="border p-2 rounded w-1/2">
                    <option value="">All Customers</option>
                    {customers.map((cust) => (
                        <option key={cust._id} value={cust._id}>{cust.firstName} {cust.lastName}</option>
                    ))}
                </select>

                <select value={selectedVehicle} onChange={(e) => setSelectedVehicle(e.target.value)} className="border p-2 rounded w-1/2">
                    <option value="">All Vehicles</option>
                    {vehicles.map((veh) => (
                        <option key={veh._id} value={veh._id}>{veh.model} - {veh.plateNumber}</option>
                    ))}
                </select>
            </div>

            <div className="flex justify-between items-center mb-6">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => { setSelectedCustomer(''); setSelectedVehicle(''); }}>Reset Filters</button>
                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onClick={() => navigate('/add-bill')}> ➕ Add Invoice</button>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : filteredBills.length === 0 ? (
                <p>No invoices found.</p>
            ) : (
                <div className="space-y-4">
                    {filteredBills.map((bill) => (
                        <div key={bill._id} className="border p-4 rounded shadow-sm bg-white hover:shadow-md transition flex justify-between items-center">
                            <div>
                                <div className="font-semibold"> 🦾 Customer: {bill.customer ? `${bill.customer.firstName} ${bill.customer.lastName}` : 'Unknown'}</div>
                                <div>🚗 Vehicle: {bill.vehicle?.model || 'N/A'} - {bill.vehicle?.plateNumber || ''}</div>
                                <div>💰 Total Price: {bill.totalPrice.toLocaleString()} €</div>
                                <div>📅 Date: {new Date(bill.date).toLocaleDateString()}</div>

                                <details className="mt-2">
                                    <summary className="cursor-pointer text-blue-600">View Services</summary>
                                    <ul className="list-disc pl-5 mt-2">
                                        {bill.services.map((srv, idx) => (
                                            <li key={idx}>{srv.description} — {srv.price.toLocaleString()} €</li>
                                        ))}
                                    </ul>
                                </details>
                                <details className="mt-2">
                                    <summary className="cursor-pointer text-blue-600">Parts Used</summary>
                                    <ul className="list-disc pl-5 mt-2">
                                        {bill.maintenanceId?.partsUsed?.length > 0 ? (
                                            bill.maintenanceId.partsUsed.map((part, idx) => (
                                                <li key={idx}>{part.name}</li>
                                            ))
                                        ) : (
                                            <li className="text-gray-500">No parts used</li>
                                        )}
                                    </ul>
                                </details>
                            </div>


                            <div className="flex flex-col items-end gap-2">
                                <button onClick={() => navigate(`/edit-bill/${bill._id}`)} className="bg-yellow-400 text-black px-5 py-2 rounded hover:bg-yellow-500"> ✏️ Edit</button>
                                <button onClick={() => handleArchive(bill._id)} className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"> 📦 Archive</button>
                                <button onClick={() => handlePrint(bill)} className="bg-indigo-500 text-white px-5 py-2 rounded hover:bg-indigo-600"> 🖶️ Print</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Printable View */}
            {printBill && (
                <div className="fixed inset-0 bg-white text-black p-10 z-50" ref={printRef}>
                    <div className="max-w-xl mx-auto border rounded shadow p-6">
                        <h2 className="text-xl font-bold text-center mb-4">🧾 Invoice Details</h2>
                        <p><strong>🧍 Customer:</strong> {printBill.customer?.firstName} {printBill.customer?.lastName}</p>
                        <p><strong>🚗 Vehicle:</strong> {printBill.vehicle?.brand} {printBill.vehicle?.model} ({printBill.vehicle?.plateNumber})</p>
                        <p><strong>📅 Date:</strong> {new Date(printBill.date).toLocaleDateString()}</p>

                        <div className="mt-4">
                            <h4 className="font-semibold mb-2">Services:</h4>
                            <ul className="list-disc pl-5 space-y-1 text-sm">
                                {printBill.services.map((srv, idx) => (
                                    <li key={idx}>{srv.description} — €{srv.price.toLocaleString()}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-4">
                            <h4 className="font-semibold mb-2">Parts Used:</h4>
                            <ul className="list-disc pl-5 space-y-1 text-sm">
                                {Array.isArray(printBill.maintenanceId?.partsUsed) && printBill.maintenanceId.partsUsed.length > 0 ? (
                                    printBill.maintenanceId.partsUsed.map((part, idx) => (
                                        <li key={idx}>{part.name}</li>
                                    ))
                                ) : (
                                    <li className="text-gray-400">None</li>
                                )}
                            </ul>
                        </div>

                        <p className="mt-4 font-bold text-right text-lg">💰 Total: €{printBill.totalPrice.toLocaleString()}</p>

                        {/* Action Buttons */}
                        <div className="flex justify-between gap-3 mt-6 no-print">
                            <button
                                type="button"
                                onClick={() => setPrintBill(null)}
                                className="bg-gray-300 text-gray-800 px-5 py-2 rounded hover:bg-gray-400"
                            >
                                ❌ Cancel
                            </button>

                            <button
                                onClick={() => {
                                    window.print();
                                    setTimeout(() => setPrintBill(null), 500);
                                }}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
                            >
                                🖨️ Print Now
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
};

export default InvoiceList;

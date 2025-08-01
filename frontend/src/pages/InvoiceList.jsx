import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import toast from 'react-hot-toast';

const InvoiceList = () => {
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBills = async () => {
            try {
                const response = await axiosInstance.get('/api/bills');
                setBills(response.data);
            } catch (error) {
                toast.error('Failed to fetch invoices');
            } finally {
                setLoading(false);
            }
        };

        fetchBills();
    }, []);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-10"> 📄 Invoice List</h1>

            {loading ? (
                <p>Loading...</p>
            ) : bills.length === 0 ? (
                <p>No invoices found.</p>
            ) : (
                <div className="space-y-4">
                    {bills.map((bill) => (
                        <div
                            key={bill._id}
                            className="border p-4 rounded shadow-sm bg-white hover:shadow-md transition"
                        >
                            <div className="font-semibold">
                                🧾 Customer: {bill.customer ? `${bill.customer.firstName} ${bill.customer.lastName}` : 'Unknown'}
                            </div>
                            <div>
                                🚗 Vehicle: {bill.vehicle?.model || 'N/A'} - {bill.vehicle?.plateNumber || ''}
                            </div>
                            <div>💰 Total Price: {bill.totalPrice.toLocaleString()} € </div>
                            <div>📅 Date: {new Date(bill.date).toLocaleDateString()}</div>

                            <details className="mt-2">
                                <summary className="cursor-pointer text-blue-600">View Services</summary>
                                <ul className="list-disc pl-5 mt-2">
                                    {bill.services.map((srv, idx) => (
                                        <li key={idx}>
                                            {srv.description} — {srv.price.toLocaleString()} €
                                        </li>
                                    ))}
                                </ul>
                            </details>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default InvoiceList;

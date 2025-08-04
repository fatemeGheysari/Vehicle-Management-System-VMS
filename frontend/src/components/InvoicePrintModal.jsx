import React, { forwardRef } from "react";

const InvoicePrintModal = forwardRef(({ bill, onCancel, onConfirm }, ref) => {
    if (!bill) return null;

    return (
        <div ref={ref} className="bg-white p-6 rounded shadow max-w-xl mx-auto text-gray-800 print:block print:shadow-none">
            <h2 className="text-xl font-bold mb-4">🧾 Invoice Preview</h2>
            <p><strong>Customer:</strong> {bill.customer?.firstName} {bill.customer?.lastName}</p>
            <p><strong>Vehicle:</strong> {bill.vehicle?.model} – {bill.vehicle?.plateNumber}</p>
            <p><strong>Date:</strong> {new Date(bill.date).toLocaleDateString()}</p>
            <p><strong>Total Price:</strong> {bill.totalPrice.toLocaleString()} €</p>

            <ul className="mt-3 list-disc ml-6">
                {bill.services.map((srv, idx) => (
                    <li key={idx}>{srv.description} — {srv.price.toLocaleString()} €</li>
                ))}
            </ul>

            <div className="flex justify-end gap-3 mt-6 no-print">
                <button onClick={onCancel} className="btn-gray">❌ Cancel</button>
                <button onClick={onConfirm} className="btn-blue">🖨️ Print</button>
            </div>
        </div>
    );
});

export default InvoicePrintModal;

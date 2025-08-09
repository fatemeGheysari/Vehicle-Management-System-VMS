// src/components/InvoiceCard.jsx
import React from "react";

// Note: Buttons are given the "no-print" class so they are only visible on the screen, not in print.
export default function InvoiceCard({
    bill,
    onEdit,
    onArchive,
    onPrint,
    className = "",
}) {
    if (!bill) return null;

    return (
        <div className={`invoice-card bg-white border rounded shadow-sm p-4 ${className}`}>
            <div className="flex justify-between gap-4">
                <div className="flex-1">
                    <div className="font-semibold">
                        🧍 Customer:{" "}
                        {bill.customer ? `${bill.customer.firstName} ${bill.customer.lastName}` : "Unknown"}
                    </div>
                    <div>
                        🚗 Vehicle: {bill.vehicle?.brand || "—"} {bill.vehicle?.model || "—"}{" "}
                        {bill.vehicle?.plateNumber ? `(${bill.vehicle.plateNumber})` : ""}
                    </div>
                    <div>📅 Date: {new Date(bill.date).toLocaleDateString()}</div>
                    <div className="mt-3">
                        <div className="font-semibold mb-1">Services:</div>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                            {bill.services?.map((srv, idx) => (
                                <li key={idx}>
                                    {srv.description} — €{Number(srv.price || 0).toLocaleString()}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-3">
                        <div className="font-semibold mb-1">Parts Used:</div>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                            {Array.isArray(bill.maintenanceId?.partsUsed) &&
                                bill.maintenanceId.partsUsed.length > 0 ? (
                                bill.maintenanceId.partsUsed.map((part, idx) => <li key={idx}>{part.name}</li>)
                            ) : (
                                <li className="text-gray-500">None</li>
                            )}
                        </ul>
                    </div>

                    <div className="mt-3 font-bold text-right text-lg">
                        💰 Total: €{Number(bill.totalPrice || 0).toLocaleString()}
                    </div>
                </div>

                {/* Buttons are hidden in print */}
                <div className="flex flex-col items-end gap-2 no-print">
                    {onEdit && (
                        <button onClick={onEdit} className="bg-yellow-400 text-black px-5 py-2 rounded hover:bg-yellow-500">
                            ✏️ Edit
                        </button>
                    )}
                    {onArchive && (
                        <button onClick={onArchive} className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600">
                            📦 Archive
                        </button>
                    )}
                    {onPrint && (
                        <button onClick={onPrint} className="bg-indigo-500 text-white px-5 py-2 rounded hover:bg-indigo-600">
                            🖶️ Print
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

import React from "react";

export default function ConfirmModal({ visible, title, message, onConfirm, onCancel }) {
    if (!visible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
                <h2 className="text-lg font-bold mb-2">{title || "Are you sure?"}</h2>
                <p className="text-gray-700 mb-4">{message || "This action cannot be undone."}</p>
                <div className="flex justify-end gap-2">
                    <button onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                        No
                    </button>
                    <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
}

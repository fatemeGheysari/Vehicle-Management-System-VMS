import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import toast from 'react-hot-toast';

const EditBill = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [customers, setCustomers] = useState([]);
    const [vehicles, setVehicles] = useState([]);

    const { register, control, handleSubmit, reset } = useForm({
        defaultValues: {
            customer: '',
            vehicle: '',
            services: [],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'services',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [billRes, customersRes, vehiclesRes] = await Promise.all([
                    axiosInstance.get(`/api/bills/${id}`),
                    axiosInstance.get('/api/customers'),
                    axiosInstance.get('/api/vehicles'),
                ]);

                reset({
                    customer: billRes.data.customer._id,
                    vehicle: billRes.data.vehicle._id,
                    services: billRes.data.services,
                });

                setCustomers(customersRes.data);
                setVehicles(vehiclesRes.data);
            } catch (err) {
                toast.error('Failed to fetch bill data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, reset]);

    const onSubmit = async (data) => {
        const cleanedServices = data.services.map((s) => ({
            description: s.description,
            price: parseFloat(s.price.toString().replace(',', '.')) || 0,
        }));

        const totalPrice = cleanedServices.reduce((sum, s) => sum + s.price, 0);

        try {
            await axiosInstance.put(`/api/bills/${id}`, {
                customer: data.customer,
                vehicle: data.vehicle,
                services: cleanedServices,
                totalPrice,
            });

            toast.success('Invoice updated successfully');
            navigate('/invoices');
        } catch (err) {
            toast.error('Update failed');
        }
    };

    if (loading) return <p className="p-6">Loading...</p>;

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6 flex items-center justify-center gap-2 text-center">
                ✏️ Edit Invoice
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white border rounded p-6 shadow-sm">
                {/* Customer */}
                <div>
                    <label className="block font-medium mb-1">Customer</label>
                    <select {...register('customer')} className="border p-2 rounded w-full">
                        <option value="">Select Customer</option>
                        {customers.map((c) => (
                            <option key={c._id} value={c._id}>
                                {c.firstName} {c.lastName}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Vehicle */}
                <div>
                    <label className="block font-medium mb-1">Vehicle</label>
                    <select {...register('vehicle')} className="border p-2 rounded w-full">
                        <option value="">Select Vehicle</option>
                        {vehicles.map((v) => (
                            <option key={v._id} value={v._id}>
                                {v.model} - {v.plateNumber}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Services */}
                <div>
                    <label className="block font-medium mb-2">Services</label>
                    <div className="space-y-2">
                        {fields.map((field, index) => (
                            <div key={field.id} className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Description"
                                    {...register(`services.${index}.description`)}
                                    className="border p-2 rounded flex-1"
                                />
                                <input
                                    type="number"
                                    step="0.01"
                                    placeholder="Price"
                                    {...register(`services.${index}.price`)}
                                    className="border p-2 rounded w-32"
                                />
                                <button type="button" onClick={() => remove(index)} className="text-red-500">
                                    🗑️
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => append({ description: '', price: '' })}
                            className="text-sm text-blue-600"
                        >
                            ➕ Add Service
                        </button>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between mt-6">
                    <button
                        type="button"
                        onClick={() => navigate('/invoices')}
                        className="bg-gray-300 text-gray-800 px-5 py-2 rounded hover:bg-gray-400"
                    >
                        ❌ Cancel
                    </button>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                    >
                        💾 Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditBill;

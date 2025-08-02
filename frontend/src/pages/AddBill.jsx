import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import toast from 'react-hot-toast';

const AddBill = () => {
    const navigate = useNavigate();

    const { register, control, handleSubmit, watch, reset } = useForm({
        defaultValues: {
            customer: '',
            vehicle: '',
            services: [{ description: '', price: 0 }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'services',
    });

    const [customers, setCustomers] = useState([]);
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [custRes, vehRes] = await Promise.all([
                    axiosInstance.get('/api/customers'),
                    axiosInstance.get('/api/vehicles'),
                ]);
                setCustomers(custRes.data);
                setVehicles(vehRes.data);
            } catch (err) {
                toast.error('Failed to load customers or vehicles');
            }
        };

        fetchData();
    }, []);

    const services = watch('services');
    const totalPrice = services.reduce((sum, item) => sum + Number(item.price || 0), 0);

    const onSubmit = async (data) => {
        try {
            const cleanedServices = data.services.map((s) => ({
                description: s.description,
                price: parseFloat(s.price.toString().replace(',', '.')) || 0,
            }));

            await axiosInstance.post('/api/bills', {
                customer: data.customer,
                vehicle: data.vehicle,
                services: cleanedServices,
                totalPrice,
            });

            toast.success('Invoice created successfully!');
            reset();
            navigate('/invoices');
        } catch (err) {
            toast.error('Failed to submit invoice');
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-10"> ➕ Create New Invoice</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Customer */}
                <div>
                    <label className="block font-semibold mb-1">Customer:</label>
                    <select {...register('customer')} className="w-full border p-2 rounded" required>
                        <option value="">-- Select Customer --</option>
                        {customers.map((cust) => (
                            <option key={cust._id} value={cust._id}>
                                {cust.firstName} {cust.lastName}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Vehicle */}
                <div>
                    <label className="block font-semibold mb-1">Vehicle:</label>
                    <select {...register('vehicle')} className="w-full border p-2 rounded" required>
                        <option value="">-- Select Vehicle --</option>
                        {vehicles.map((veh) => (
                            <option key={veh._id} value={veh._id}>
                                {veh.model} - {veh.plateNumber}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Services */}
                <div>
                    <label className="block font-semibold mb-2">Services:</label>
                    {fields.map((item, index) => (
                        <div key={item.id} className="flex gap-2 mb-2">
                            <input
                                type="text"
                                placeholder="Description"
                                {...register(`services.${index}.description`, { required: true })}
                                className="flex-1 border p-2 rounded"
                            />
                            <input
                                type="number"
                                placeholder="Price"
                                {...register(`services.${index}.price`, { required: true })}
                                className="w-32 border p-2 rounded"
                            />
                            <button
                                type="button"
                                onClick={() => remove(index)}
                                className="text-red-500 font-bold"
                            >
                                ❌
                            </button>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={() => append({ description: '', price: 0 })}
                        className="bg-blue-500 text-white px-4 py-1 rounded"
                    >
                        + Add Service
                    </button>
                </div>

                {/* Total */}
                <div className="font-bold text-lg">
                    Total: {totalPrice.toLocaleString()} €
                </div>

                {/* Buttons */}
                <div className="flex gap-4 mt-6">
                    <button
                        type="submit"
                        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                    >
                        Save Invoice
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate('/invoices')}
                        className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddBill;

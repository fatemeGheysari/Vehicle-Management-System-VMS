import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import axiosInstance from '../utils/axiosInstance';
import toast from 'react-hot-toast';

const AddBill = () => {
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
                toast.error('Failed to fetch customer or vehicle data');
            }
        };

        fetchData();
    }, []);

    const onSubmit = async (data) => {
        const totalPrice = data.services.reduce((sum, item) => sum + Number(item.price), 0);

        try {
            await axiosInstance.post('/api/bills', {
                ...data,
                totalPrice,
            });
            toast.success('Invoice created successfully!');
            reset();
        } catch (err) {
            toast.error('Failed to submit invoice');
        }
    };

    const services = watch('services');
    const totalPrice = services.reduce((sum, s) => sum + Number(s.price || 0), 0);

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Create New Invoice</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Customer Selection */}
                <div>
                    <label className="block font-semibold">Customer:</label>
                    <select {...register('customer')} className="w-full border p-2 rounded">
                        <option value="">-- Select Customer --</option>
                        {customers.map((cust) => (
                            <option key={cust._id} value={cust._id}>{cust.name}</option>
                        ))}
                    </select>
                </div>

                {/* Vehicle Selection */}
                <div>
                    <label className="block font-semibold">Vehicle:</label>
                    <select {...register('vehicle')} className="w-full border p-2 rounded">
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
                                {...register(`services.${index}.description`)}
                                className="flex-1 border p-2 rounded"
                            />
                            <input
                                type="number"
                                placeholder="Price"
                                {...register(`services.${index}.price`)}
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
                    Total: {totalPrice.toLocaleString()} Toman
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-2 rounded mt-4"
                >
                    Submit Invoice
                </button>
            </form>
        </div>
    );
};

export default AddBill;

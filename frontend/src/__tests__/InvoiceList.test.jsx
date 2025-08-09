// 📁 src/__tests__/InvoiceList.test.jsx
import { render, screen, waitFor } from '@testing-library/react';
import InvoiceList from '../pages/invoices/InvoiceList';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import axiosInstance from '../utils/axiosInstance';

// ✅ Mock axiosInstance
vi.mock('../utils/axiosInstance');

// ✅ Mock data for testing
const mockBills = [
    {
        _id: '1',
        customer: { _id: 'c1', firstName: 'Ali', lastName: 'Ahmadi' },
        vehicle: { _id: 'v1', model: 'X5', plateNumber: 'B-MW1234' },
        services: [
            { description: 'Oil Change', price: 100 },
            { description: 'Tire Rotation', price: 50 },
        ],
        totalPrice: 150,
        date: '2025-08-01T12:00:00.000Z',
    },
];

const mockCustomers = [
    { _id: 'c1', firstName: 'Ali', lastName: 'Ahmadi' },
];

const mockVehicles = [
    { _id: 'v1', model: 'X5', plateNumber: 'B-MW1234' },
];

// ✅ Mock axios.get calls
axiosInstance.get.mockImplementation((url) => {
    switch (url) {
        case '/api/bills':
            return Promise.resolve({ data: mockBills });
        case '/api/customers':
            return Promise.resolve({ data: mockCustomers });
        case '/api/vehicles':
            return Promise.resolve({ data: mockVehicles });
        default:
            return Promise.resolve({ data: [] });
    }
});

// ✅ Test case
it('renders invoice list with mock data', async () => {
    render(
        <BrowserRouter>
            <InvoiceList />
        </BrowserRouter>
    );

    // Wait for data to load
    await waitFor(() => {
        expect(screen.getByText(/🦾 Customer: Ali Ahmadi/)).toBeInTheDocument();
        expect(screen.getAllByText(/X5 - B-MW1234/).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/150 €/).length).toBeGreaterThan(0);
    });
});

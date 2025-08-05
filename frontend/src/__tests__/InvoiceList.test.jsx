// InvoiceList.test.jsx
import { render, screen } from '@testing-library/react';
import InvoiceList from '../pages/InvoiceList';
import { BrowserRouter } from 'react-router-dom';
import { test, expect } from 'vitest';
import '@testing-library/jest-dom';

test('renders invoice list title', () => {
    render(
        <BrowserRouter>
            <InvoiceList />
        </BrowserRouter>
    );

    const heading = screen.getByText(/Invoice List/i);
    expect(heading).toBeInTheDocument();
});

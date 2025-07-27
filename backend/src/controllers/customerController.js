import Customer from '../models/Customer.js';

// Create a new customer
export const createCustomer = async (req, res) => {
  try {
    const customer = new Customer(req.body);
    const saved = await customer.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error creating customer:', err);

    if (err.code === 11000 && err.keyPattern?.email) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all customers
export const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get customer by ID
export const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update customer
export const updateCustomer = async (req, res) => {
  try {
    const updated = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Customer not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete customer
export const deleteCustomer = async (req, res) => {
  try {
    const deleted = await Customer.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Customer not found' });
    res.status(200).json({ message: 'Customer deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

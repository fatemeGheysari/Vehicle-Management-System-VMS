const Customer = require('../models/Customer');

// Create a new customer
exports.createCustomer = async (req, res) => {
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
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get customer by ID
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update customer
exports.updateCustomer = async (req, res) => {
  try {
    const updated = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Customer not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete customer
exports.deleteCustomer = async (req, res) => {
  try {
    const deleted = await Customer.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Customer not found' });
    res.status(200).json({ message: 'Customer deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

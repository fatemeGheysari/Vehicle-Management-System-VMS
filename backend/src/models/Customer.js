// models/Customer.js
import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email']
  },
  address: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;

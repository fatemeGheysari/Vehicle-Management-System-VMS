// models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'mechanic', 'user'], // allowed roles
    default: 'user'
  }
}, {
  timestamps: true // adds createdAt and updatedAt fields
});

// 🔐 Middleware to hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('passwordHash')) return next();
  const salt = await bcrypt.genSalt(10);
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
  next();
});

// 🔎 Instance method to compare passwords during login
userSchema.methods.comparePassword = function (plainPassword) {
  return bcrypt.compare(plainPassword, this.passwordHash);
};

const User = mongoose.model('User', userSchema);

export default User;

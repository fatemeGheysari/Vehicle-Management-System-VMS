import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '2d' }
  );
};

// POST /api/auth/register
export const register = async (req, res) => {
  try {
    const { username, passwordHash, role } = req.body;

    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ message: 'Username already exists' });

    const user = new User({ username, passwordHash, role });
    await user.save();

    const token = generateToken(user);
    res.status(201).json({
      token,
      user: { id: user._id, username: user.username, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

// POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { username, passwordHash } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await user.comparePassword(passwordHash);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user);
    res.json({
      token,
      user: { id: user._id, username: user.username, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

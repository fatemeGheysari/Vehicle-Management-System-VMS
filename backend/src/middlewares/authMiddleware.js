import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if Authorization header exists and has Bearer token
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token missing or invalid' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add user data to request
    next(); // Continue to the route
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token', error: err.message });
  }
};

export { authMiddleware };

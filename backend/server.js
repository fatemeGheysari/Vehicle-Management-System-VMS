import connectDB from './config/db.js';
import app from './src/app.js';

if (process.env.NODE_ENV !== 'test') {
    connectDB();

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

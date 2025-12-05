import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import adminRoutes from './routes/adminRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


connectDB();


app.get('/', (req, res) => res.send('School Management API'));
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


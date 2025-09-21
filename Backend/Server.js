require('dotenv').config();
import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import connectDB from './src/config/db';
import apiRoutes from './src/routes/api';

const app = express();
app.use(cors());
app.use(json());

connectDB();

app.use('/api', apiRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

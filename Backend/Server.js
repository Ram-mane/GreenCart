require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { json } = require('body-parser');
const connectDB = require('./src/config/db');
const apiRoutes = require('./src/routes/api');

const app = express();
app.use(cors());
app.use(json());

connectDB();

app.use('/api', apiRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

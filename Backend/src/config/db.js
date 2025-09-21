const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const url = process.env.MONGO_URL;
    if (!url) throw new Error('MONGO_URL not set in env');
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('DB connection error', err);
    process.exit(1);
  }
};

module.exports = connectDB;

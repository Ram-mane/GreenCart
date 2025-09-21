const mongoose = require('mongoose');
const Product = require('../models/Product');
const User = require('../models/User');
require('dotenv').config();

const sampleProducts = [
  {
    name: 'Fresh Organic Apples',
    description: 'Crisp and sweet organic apples from local farms',
    price: 3.99,
    category: 'fruits',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300',
    inStock: true,
    quantity: 50,
    organic: true,
    tags: ['fresh', 'organic', 'local']
  },
  {
    name: 'Fresh Spinach Leaves',
    description: 'Nutrient-rich fresh spinach leaves perfect for salads',
    price: 2.49,
    category: 'vegetables',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300',
    inStock: true,
    quantity: 30,
    organic: true,
    tags: ['leafy', 'green', 'healthy']
  },
  {
    name: 'Organic Carrots',
    description: 'Sweet and crunchy organic carrots grown without pesticides',
    price: 1.99,
    category: 'vegetables',
    image: 'https://images.unsplash.com/photo-1582515073490-39981397c445?w=300',
    inStock: true,
    quantity: 40,
    organic: true,
    tags: ['root', 'orange', 'healthy']
  },
  {
    name: 'Fresh Basil',
    description: 'Aromatic fresh basil herbs for cooking',
    price: 1.49,
    category: 'herbs',
    image: 'https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=300',
    inStock: true,
    quantity: 25,
    organic: false,
    tags: ['aromatic', 'cooking', 'herbs']
  },
  {
    name: 'Organic Brown Rice',
    description: 'Wholesome organic brown rice packed with nutrients',
    price: 4.99,
    category: 'grains',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300',
    inStock: true,
    quantity: 20,
    organic: true,
    tags: ['whole grain', 'nutritious', 'staple']
  },
  {
    name: 'Farm Fresh Milk',
    description: 'Fresh whole milk from grass-fed cows',
    price: 3.49,
    category: 'dairy',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300',
    inStock: true,
    quantity: 15,
    organic: false,
    tags: ['fresh', 'calcium', 'protein']
  }
];

const sampleUsers = [
  {
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1-555-0123',
    address: {
      street: '123 Green Street',
      city: 'EcoVille',
      state: 'CA',
      zipCode: '90210',
      country: 'US'
    },
    role: 'customer'
  },
  {
    name: 'Admin User',
    email: 'admin@greencart.com',
    phone: '+1-555-0001',
    address: {
      street: '456 Admin Avenue',
      city: 'Management City',
      state: 'NY',
      zipCode: '10001',
      country: 'US'
    },
    role: 'admin'
  }
];

const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/greencart');
    console.log('Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await Product.deleteMany({});
    await User.deleteMany({});

    // Insert sample products
    console.log('Inserting sample products...');
    const products = await Product.insertMany(sampleProducts);
    console.log(`Inserted ${products.length} products`);

    // Insert sample users
    console.log('Inserting sample users...');
    const users = await User.insertMany(sampleUsers);
    console.log(`Inserted ${users.length} users`);

    console.log('Database seeded successfully!');
    console.log('\nSample API endpoints to test:');
    console.log('GET http://localhost:5000/api/products');
    console.log('GET http://localhost:5000/api/users');
    console.log('GET http://localhost:5000/api/health');
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
};

// Run seeder if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase, sampleProducts, sampleUsers };
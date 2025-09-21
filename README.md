# 🌱 GreenCart

A modern, full-stack green grocery e-commerce platform built with React, Vite, Node.js, Express, and MongoDB.

![GreenCart](https://via.placeholder.com/800x400/4CAF50/ffffff?text=GreenCart+-+Fresh+%7C+Organic+%7C+Delivered)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Docker Setup](#docker-setup)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- 🛒 **Product Catalog**: Browse fresh organic groceries with advanced filtering
- 🔍 **Smart Search**: Find products by name, description, or tags
- 📱 **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- 🌱 **Organic Focus**: Clear indication of organic vs. conventional products
- 📊 **Admin Dashboard**: Manage products, users, and inventory
- 🔐 **RESTful API**: Well-documented API endpoints
- 🐳 **Docker Ready**: Containerized for easy deployment
- 📦 **Modern Stack**: Built with latest technologies and best practices

## 🚀 Tech Stack

### Frontend
- **React 19** - Modern UI library
- **Vite** - Lightning-fast build tool
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Modern styling with flexbox and grid

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **ESLint** - Code linting
- **Git** - Version control

## 📁 Project Structure

```
GreenCart/
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service functions
│   │   └── utils/           # Utility functions
│   ├── public/              # Static assets
│   └── package.json
├── backend/                  # Node.js + Express backend
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API route handlers
│   ├── controllers/         # Business logic
│   ├── middleware/          # Custom middleware
│   ├── seeds/               # Database seeders
│   └── server.js            # Express server
├── docker-compose.yml       # Docker services configuration
├── package.json            # Root package.json with scripts
└── README.md               # You are here!
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** (v5.0 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/)
- **Docker & Docker Compose** (optional) - [Download](https://www.docker.com/)

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Ram-mane/GreenCart.git
cd GreenCart
```

### 2. Install Dependencies

```bash
# Install all dependencies (root, frontend, and backend)
npm run install:all
```

Or install manually:

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend && npm install

# Install backend dependencies
cd ../backend && npm install
```

### 3. Environment Configuration

#### Backend Environment (.env)
Create a `.env` file in the `backend` directory:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/greencart
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
API_URL=http://localhost:5000/api
CLIENT_URL=http://localhost:5173
```

#### Frontend Environment (.env)
Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=GreenCart
VITE_APP_VERSION=1.0.0
```

### 4. Database Setup

Make sure MongoDB is running on your system, then seed the database:

```bash
npm run seed
```

This will populate your database with sample products and users.

## 🎯 Running the Application

### Development Mode

Start both frontend and backend in development mode:

```bash
npm run dev
```

This will start:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000
- **API Health**: http://localhost:5000/api/health

### Individual Services

Start services individually:

```bash
# Frontend only
npm run dev:frontend

# Backend only
npm run dev:backend
```

### Production Mode

```bash
# Build the application
npm run build

# Start in production mode
npm start
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Products
- `GET /products` - Get all products (with filtering)
- `GET /products/:id` - Get single product
- `POST /products` - Create new product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product

#### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get single user
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

#### Health Check
- `GET /health` - API health status

### Query Parameters (Products)

```bash
# Filter by category
GET /api/products?category=fruits

# Filter organic products
GET /api/products?organic=true

# Search products
GET /api/products?search=apple

# Filter in-stock items
GET /api/products?inStock=true

# Pagination
GET /api/products?page=2&limit=10

# Sort products
GET /api/products?sort=price&order=asc
```

### Example Response

```json
{
  "products": [...],
  "totalPages": 5,
  "currentPage": 1,
  "total": 42
}
```

## 🌍 Environment Variables

### Backend Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/greencart` |
| `JWT_SECRET` | JWT signing secret | - |
| `JWT_EXPIRE` | JWT expiration time | `7d` |

### Frontend Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5000/api` |
| `VITE_APP_NAME` | Application name | `GreenCart` |
| `VITE_APP_VERSION` | Application version | `1.0.0` |

## 🐳 Docker Setup

### Using Docker Compose (Recommended)

```bash
# Start all services (MongoDB, Backend, Frontend)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Remove volumes (data will be lost)
docker-compose down -v
```

### Services URLs (Docker)
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000
- **MongoDB**: localhost:27017

### Individual Docker Commands

```bash
# Build images
docker-compose build

# Start specific service
docker-compose up frontend
docker-compose up backend
docker-compose up mongodb

# Scale services
docker-compose up --scale backend=3
```

## 🔧 Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both frontend and backend in development mode |
| `npm run dev:frontend` | Start only frontend development server |
| `npm run dev:backend` | Start only backend development server |
| `npm run build` | Build both frontend and backend |
| `npm run seed` | Populate database with sample data |
| `npm run install:all` | Install all dependencies |

### Linting

```bash
# Frontend linting
cd frontend && npm run lint

# Backend uses ESLint configuration from package.json
```

### Adding New Products (Manual)

```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Organic Bananas",
    "description": "Sweet organic bananas",
    "price": 2.99,
    "category": "fruits",
    "organic": true,
    "quantity": 100,
    "tags": ["tropical", "potassium", "healthy"]
  }'
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style

- Use ES6+ JavaScript features
- Follow React best practices and hooks
- Use meaningful variable and function names
- Add comments for complex logic
- Ensure responsive design for all UI components

### Commit Messages

Follow conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Adding or updating tests

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

If you have any questions or need help, please:

1. Check the [Issues](https://github.com/Ram-mane/GreenCart/issues) page
2. Create a new issue if your problem isn't already listed
3. Contact the maintainers: hello@greencart.com

## 🙏 Acknowledgments

- Fresh produce images from [Unsplash](https://unsplash.com/)
- Icons and emojis from [Emoji](https://emojipedia.org/)
- Inspiration from modern e-commerce platforms

---

**Built with ❤️ for a greener future** 🌱

*GreenCart - Where fresh meets technology*
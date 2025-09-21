# GreenCart

## Project Overview
GreenCart is a logistics simulation and analytics platform. It allows users to simulate delivery operations, assign drivers, analyze KPIs, and visualize results through a modern dashboard. The goal is to help logistics companies optimize routes, reduce costs, and improve delivery efficiency.

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, Chart.js
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Testing:** Jest
- **Deployment:** Netlify (frontend), Render (backend)

## Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB (local or cloud)

### Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `Backend/` with:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```
4. Start the backend server:
   ```bash
   node Server.js
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd Frontend/GreenCart
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `Frontend/GreenCart/` with:
   ```env
   VITE_API_URL=http://localhost:5000
   ```
4. Start the frontend dev server:
   ```bash
   npm run dev
   ```

## Environment Variables

### Backend (`Backend/.env`)
- `MONGODB_URI` — MongoDB connection string
- `PORT` — Port for backend server

### Frontend (`Frontend/GreenCart/.env`)
- `VITE_API_URL` — Base URL for backend API

## Deployment Instructions

### Backend (Render)
- Platform: [Render](https://render.com)
- URL: https://greencart-ffm1.onrender.com
- Steps:
  1. Connect GitHub repo to Render.
  2. Set environment variables (`MONGODB_URI`, `PORT`).
  3. Deploy the backend service.

### Frontend (Netlify)
- Platform: [Netlify](https://netlify.com)
- Steps:
  1. Install Netlify CLI globally:
    ```bash
    npm install -g netlify-cli
    ```
  2. Login to Netlify:
    ```bash
    netlify login
    ```
  3. Build the frontend:
    ```bash
    npm run build
    ```
  4. Deploy the `dist` folder to Netlify:
    ```bash
    netlify deploy --prod --dir=dist
    ```
  5. Set the environment variable `VITE_API_URL` in the Netlify dashboard to your backend URL (e.g., https://greencart-ffm1.onrender.com).
  6. After deployment, Netlify will provide a live URL for your frontend.

## API Documentation

### Base URL
- Production: `https://greencart-ffm1.onrender.com/api`
- Local: `http://localhost:5000/api`

### Endpoints

#### 1. Simulate Orders
- **POST** `/api/simulate`
- **Request Body:**
  ```json
  {
    "numDrivers": 3,
    "routeStartTime": "09:00",
    "maxHoursPerDriver": 8
  }
  ```
- **Response:**
  ```json
  {
    "perOrderResults": [
      {
        "order_id": "...",
        "driver_name": "...",
        "route_id": "...",
        "simulatedTime": 45,
        "isLate": false,
        "penalty": 0,
        "bonus": 100,
        "fuelCost": 120,
        "profit": 980
      }
    ],
    "KPIs": {
      "totalProfit": 5000,
      "totalDeliveries": 10,
      "totalOnTime": 9,
      "efficiency": 90,
      "totalFuel": 1200
    }
  }
  ```

#### 2. Simulation History
- **GET** `/api/simulations`
- **Response:** Array of previous simulation results.

#### 3. Get Simulation by ID
- **GET** `/api/simulations/:id`
- **Response:** Simulation result object.

---

For more details, see code comments or contact the maintainer.

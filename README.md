# GreenCart

## 1. Project Overview & Purpose
GreenCart is a logistics simulation platform designed to optimize delivery operations. It allows users to simulate delivery scenarios, analyze key performance indicators (KPIs), and visualize results through an interactive dashboard. The project aims to help logistics companies improve efficiency, reduce costs, and make data-driven decisions.

## 2. Tech Stack Used
- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Testing:** Jest
- **Visualization:** Chart.js (or similar)

## 3. Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB (local or cloud instance)

### Backend Setup
1. Navigate to the backend directory:
	```bash
	cd Backend
	```
2. Install dependencies:
	```bash
	npm install
	```
3. Set up environment variables (see below).
4. Start the backend server:
	```bash
	node Server.js
	```

### Frontend Setup
1. Navigate to the frontend directory:
	```bash
	cd Frontend/GreenCart
	```
2. Install dependencies:
	```bash
	npm install
	```
3. Start the development server:
	```bash
	npm run dev
	```

## 4. Environment Variables

### Backend (`Backend/.env`)
- `MONGODB_URI` — MongoDB connection string
- `PORT` — Port for backend server (default: 5000)

### Frontend (`Frontend/GreenCart/.env`)
- `VITE_API_URL` — Base URL for backend API

## 5. Deployment Instructions

### Backend Deployment
- Deploy the backend to a cloud provider (e.g., Heroku, Render, AWS EC2).
- Set environment variables on the deployment platform.
- Ensure MongoDB is accessible from the deployed backend.

### Frontend Deployment
- Build the frontend for production:
  ```bash
  npm run build
  ```
- Deploy the `dist/` folder to a static hosting service (e.g., Vercel, Netlify, GitHub Pages).
- Set the `VITE_API_URL` to point to the deployed backend API.

---

For more details, refer to the code comments and individual module READMEs if available.
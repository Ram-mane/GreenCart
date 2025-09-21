import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Simulation from './pages/Simulation'
import Dashboard from './pages/Dashbord'
import SimulationsHistory from './pages/SimulationHistory'

export default function App() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar className="navbar" />
      <main className="container" style={{ flex: 1, padding: "1.5rem 1rem" }}>
        <Routes>
          <Route path="/" element={<Navigate to="/simulation" replace />} />
          <Route path="/simulation" element={<Simulation />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<SimulationsHistory />} />
        </Routes>
      </main>
      <footer className="footer">
        GreenCart Simulation — Minimal MVP
      </footer>
    </div>
  )
}
 

import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import Simulation from './pages/Simulation'
import SimulationsHistory from './pages/SimulationsHistory'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Navigate to="/simulation" replace />} />
          <Route path="/simulation" element={<Simulation />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<SimulationsHistory />} />
        </Routes>
      </main>
      <footer className="bg-white border-t py-3">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          GreenCart Simulation — Minimal MVP
        </div>
      </footer>
    </div>
  )
}

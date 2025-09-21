import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-white border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">GC</div>
          <div>
            <div className="font-semibold">GreenCart</div>
            <div className="text-xs text-gray-500">Logistics Simulator</div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <NavLink to="/simulation" className={({isActive}) => `px-3 py-2 rounded-md ${isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
            Simulation
          </NavLink>
          <NavLink to="/dashboard" className={({isActive}) => `px-3 py-2 rounded-md ${isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
            Dashboard
          </NavLink>
          <NavLink to="/history" className={({isActive}) => `px-3 py-2 rounded-md ${isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
            History
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

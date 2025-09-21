import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function BarChartFuel({ breakdown = [] }) {
  // breakdown: [{name:'High', value: 1200}, ...]
  return (
    <div className="card h-56">
      <div className="text-sm text-gray-500 mb-2">Fuel cost breakdown</div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={breakdown}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

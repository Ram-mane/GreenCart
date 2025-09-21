import React from 'react'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'

const COLORS = ['#10b981', '#ef4444']

export default function PieChartOnTime({ onTime = 0, late = 0 }) {
  const data = [
    { name: 'On-time', value: onTime },
    { name: 'Late', value: late }
  ]
  return (
    <div className="card h-56">
      <div className="text-sm text-gray-500 mb-2">On-time vs Late</div>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie dataKey="value" isAnimationActive={false} data={data} innerRadius={40} outerRadius={70} paddingAngle={2}>
            {data.map((entry, index) => <Cell key={`c-${index}`} fill={COLORS[index % COLORS.length]} />)}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

import React from 'react'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'

const COLORS = ['#10b981', '#ef4444']

const cardStyle = {
  height: '14rem',
  background: '#fff',
  borderRadius: '0.5rem',
  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
}

const titleStyle = {
  fontSize: '0.875rem',
  color: '#6b7280',
  marginBottom: '0.5rem'
}

export default function PieChartOnTime({ onTime = 0, late = 0 }) {
  const data = [
    { name: 'On-time', value: onTime },
    { name: 'Late', value: late }
  ]
  return (
    <div style={cardStyle}>
      <div style={titleStyle}>On-time vs Late</div>
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

import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const cardStyle = {
  height: '14rem',
  background: '#fff',
  borderRadius: '0.5rem',
  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
}

const titleStyle = {
  fontSize: '0.875rem',
  color: '#6b7280',
  marginBottom: '0.5rem',
}

export default function BarChartFuel({ breakdown = [] }) {
  // breakdown: [{name:'High', value: 1200}, ...]
  return (
    <div style={cardStyle}>
      <div style={titleStyle}>Fuel cost breakdown</div>
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

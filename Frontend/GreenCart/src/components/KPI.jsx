import React from 'react'
import { toCurrency } from '../utils/format'

export default function KPI({ title, value, sub }) {
  return (
    <div className="card flex-1 min-w-0">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="mt-2 text-2xl font-semibold">{typeof value === 'number' ? toCurrency(value) : value}</div>
      {sub && <div className="text-xs text-gray-400 mt-1">{sub}</div>}
    </div>
  )
}

import React from 'react'
import { toCurrency } from '../utils/format'

export default function OrdersTable({ rows = [] }) {
  return (
    <div className="card overflow-x-auto">
      <table className="min-w-full text-left table-auto">
        <thead className="text-xs text-gray-500">
          <tr>
            <th className="px-2 py-2">Order</th>
            <th className="px-2 py-2">Driver</th>
            <th className="px-2 py-2">Time (min)</th>
            <th className="px-2 py-2">On-time</th>
            <th className="px-2 py-2">Fuel</th>
            <th className="px-2 py-2">Penalty</th>
            <th className="px-2 py-2">Bonus</th>
            <th className="px-2 py-2">Profit</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {rows.map((r, i) => (
            <tr key={i} className="border-t">
              <td className="px-2 py-2">{r.orderId}</td>
              <td className="px-2 py-2">{String(r.driverId).slice(0,8)}</td>
              <td className="px-2 py-2">{r.simulatedTime ?? '—'}</td>
              <td className="px-2 py-2">{r.isLate ? <span className="text-red-600">Late</span> : <span className="text-green-600">On time</span>}</td>
              <td className="px-2 py-2">{toCurrency(r.fuelCost)}</td>
              <td className="px-2 py-2">{toCurrency(r.penalty)}</td>
              <td className="px-2 py-2">{toCurrency(r.bonus)}</td>
              <td className="px-2 py-2 font-semibold">{toCurrency(r.profit)}</td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan="8" className="px-2 py-6 text-center text-gray-400">Run a simulation to see results</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

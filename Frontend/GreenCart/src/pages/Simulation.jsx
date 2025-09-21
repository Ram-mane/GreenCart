import React, { useState } from 'react'
import api from '../api/apiClient'
import OrdersTable from '../components/OrdersTable'
import { toCurrency } from '../utils/format'

export default function Simulation() {
  const [numDrivers, setNumDrivers] = useState(3)
  const [routeStartTime, setRouteStartTime] = useState('09:00')
  const [maxHours, setMaxHours] = useState(8)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const run = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await api.post('/simulate', {
        numDrivers: Number(numDrivers),
        routeStartTime,
        maxHoursPerDriver: Number(maxHours),
        persist: true
      })
      setResult(res.data)
    } catch (err) {
      setError(err.message || 'Simulation error')
    } finally {
      setLoading(false)
    }
  }

  const totalProfit = result?.KPIs?.totalProfit ?? 0
  const efficiency = result?.KPIs?.efficiency ?? 0
  const onTime = result?.KPIs?.totalOnTime ?? 0
  const total = result?.KPIs?.totalDeliveries ?? 0
  const late = total - onTime

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card md:col-span-2">
          <div className="text-lg font-semibold">Run Simulation</div>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-sm text-gray-600">Num drivers</label>
              <input type="number" min="1" value={numDrivers} onChange={e => setNumDrivers(e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2" />
            </div>
            <div>
              <label className="text-sm text-gray-600">Route start time</label>
              <input type="time" value={routeStartTime} onChange={e => setRouteStartTime(e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2" />
            </div>
            <div>
              <label className="text-sm text-gray-600">Max hours / driver</label>
              <input type="number" min="1" value={maxHours} onChange={e => setMaxHours(e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2" />
            </div>
          </div>

          <div className="mt-4 flex items-center space-x-3">
            <button onClick={run} className="px-4 py-2 bg-primary text-white rounded-md shadow-sm disabled:opacity-50" disabled={loading}>
              {loading ? 'Running...' : 'Run Simulation'}
            </button>
            <button onClick={() => { setResult(null); setError(null) }} className="px-4 py-2 border rounded-md">Reset</button>
            {result?.simulationId && <div className="text-sm text-gray-500">Saved — id: {String(result.simulationId).slice(0,8)}</div>}
          </div>

          {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
        </div>

        <div className="card">
          <div className="text-sm text-gray-600">Summary</div>
          <div className="mt-3 text-2xl font-semibold">{toCurrency(totalProfit)}</div>
          <div className="text-xs text-gray-500 mt-1">Efficiency: {efficiency}%</div>
          <div className="mt-3 text-sm text-gray-600">On-time / Late</div>
          <div className="mt-1 text-lg font-medium">{onTime} / {late}</div>
        </div>
      </div>

      <div>
        <OrdersTable rows={result?.perOrderResults ?? []} />
      </div>
    </div>
  )
}

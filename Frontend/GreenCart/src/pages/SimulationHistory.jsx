import React, { useEffect, useState } from 'react'
import api from '../api/apiClient'

export default function SimulationsHistory() {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const res = await api.get('/simulations')
        setList(res.data || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="space-y-4">
      <div className="text-lg font-semibold">Simulations History</div>
      <div className="space-y-3">
        {loading && <div className="text-sm text-gray-500">Loading...</div>}
        {list.length === 0 && !loading && <div className="text-sm text-gray-400">No simulations yet</div>}
        {list.map(sim => (
          <div key={sim._id} className="card">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-medium">Created: {new Date(sim.createdAt).toLocaleString()}</div>
                <div className="text-sm text-gray-500">Profit: ₹{sim.KPIs?.totalProfit ?? 0} • Efficiency: {sim.KPIs?.efficiency ?? 0}%</div>
              </div>
              <div className="text-sm text-gray-400">{sim.input?.numDrivers} drivers</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

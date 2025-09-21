import React, { useEffect, useState } from 'react'
import api from '../api/apiClient'
import KPI from '../components/KPI'
import PieChartOnTime from '../components/PieChartOnTime'
import BarChartFuel from '../components/BarChartFuel'

export default function Dashboard() {
  const [latest, setLatest] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const res = await api.get('/simulations')
        // server returns list sorted desc — take first
        const sims = res.data || []
        if (sims.length) setLatest(sims[0])
      } catch (err) {
        // ignore for now
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  // adapt shape to our charts
  const KPIs = latest?.KPIs ?? {}
  const onTime = KPIs.totalOnTime ?? 0
  const total = KPIs.totalDeliveries ?? 0
  const late = total - onTime
  // fuel breakdown simple aggregation by traffic from perOrderResults
  const breakdownMap = {}
  (latest?.perOrderResults || []).forEach(p => {
    const t = p.trafficLevel || 'Unknown'
    breakdownMap[t] = (breakdownMap[t] || 0) + (p.fuelCost || 0)
  })
  const breakdown = Object.keys(breakdownMap).map(k => ({ name: k, value: breakdownMap[k] }))

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KPI title="Total Profit" value={KPIs.totalProfit ?? 0} sub={`${KPIs.totalDeliveries ?? 0} deliveries`} />
        <KPI title="Efficiency" value={`${KPIs.efficiency ?? 0}%`} />
        <KPI title="Total Fuel" value={KPIs.totalFuel ?? 0} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <PieChartOnTime onTime={onTime} late={late} />
        </div>
        <div>
          <BarChartFuel breakdown={breakdown.length ? breakdown : [{name:'No data', value:0}]} />
        </div>
      </div>
    </div>
  )
}

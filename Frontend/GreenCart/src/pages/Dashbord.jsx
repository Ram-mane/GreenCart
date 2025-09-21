import React, { useEffect, useState } from 'react'
import api from '../api/apiClient'
import KPI from '../components/KPI'
import PieChartOnTime from '../components/PieChartOnTime'
import BarChartFuel from '../components/BarChartFuel'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '1rem',
  },
  gridMd3: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1rem',
  },
  colSpan2: {
    gridColumn: 'span 2',
  },
  // Responsive styles (simple)
  '@media (min-width: 768px)': {
    grid: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
}

export default function Dashboard() {
  const [latest, setLatest] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const res = await api.get('/simulations')
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

  const KPIs = latest?.KPIs ?? {}
  const onTime = KPIs.totalOnTime ?? 0
  const total = KPIs.totalDeliveries ?? 0
  const late = total - onTime
  const breakdownMap = {}
  ;(latest?.perOrderResults || []).forEach(p => {
    const t = p.trafficLevel || 'Unknown'
    breakdownMap[t] = (breakdownMap[t] || 0) + (p.fuelCost || 0)
  })
  const breakdown = Object.keys(breakdownMap).map(k => ({ name: k, value: breakdownMap[k] }))

  return (
    <div style={styles.container}>
      <div style={styles.gridMd3}>
        <KPI title="Total Profit" value={KPIs.totalProfit ?? 0} sub={`${KPIs.totalDeliveries ?? 0} deliveries`} />
        <KPI title="Efficiency" value={`${KPIs.efficiency ?? 0}%`} />
        <KPI title="Total Fuel" value={KPIs.totalFuel ?? 0} />
      </div>

      <div style={styles.gridMd3}>
        <div style={styles.colSpan2}>
          <PieChartOnTime onTime={onTime} late={late} />
        </div>
        <div>
          <BarChartFuel breakdown={breakdown.length ? breakdown : [{name:'No data', value:0}]} />
        </div>
      </div>
    </div>
  )
}

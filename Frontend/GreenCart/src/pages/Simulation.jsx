import React, { useState } from 'react'
import api from '../api/apiClient'
import OrdersTable from '../components/OrdersTable'
import { toCurrency } from '../utils/format'

const styles = {
  container: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
  grid: { display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' },
  gridMd: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' },
  card: { background: '#fff', borderRadius: '0.5rem', padding: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' },
  label: { fontSize: '0.875rem', color: '#4B5563' },
  input: { marginTop: '0.25rem', width: '80%', border: '1px solid #d1d5db', borderRadius: '0.375rem', padding: '0.5rem 0.75rem' },
  button: { padding: '0.5rem 1rem', background: '#2563eb', color: '#fff', borderRadius: '0.375rem', boxShadow: '0 1px 2px rgba(0,0,0,0.04)', border: 'none', cursor: 'pointer' },
  buttonDisabled: { opacity: 0.5, cursor: 'not-allowed' },
  buttonReset: { padding: '0.5rem 1rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', background: '#fff', cursor: 'pointer' },
  summaryLabel: { fontSize: '0.875rem', color: '#4B5563' },
  summaryValue: { marginTop: '0.75rem', fontSize: '2rem', fontWeight: 600 },
  summarySub: { fontSize: '0.75rem', color: '#6B7280', marginTop: '0.25rem' },
  summaryOnTime: { marginTop: '0.75rem', fontSize: '1rem', fontWeight: 500 },
  error: { marginTop: '0.75rem', fontSize: '0.875rem', color: '#dc2626' },
  flex: { display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1rem' },
  simId: { fontSize: '0.875rem', color: '#6B7280' }
}

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
    <div style={styles.container}>
      <div style={styles.gridMd}>
        <div style={styles.card}>
          <div style={{ fontSize: '1.125rem', fontWeight: 600 }}>Run Simulation</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginTop: '0.75rem' }}>
            <div>
              <label style={styles.label}>Num drivers</label>
              <input type="number" min="1" value={numDrivers} onChange={e => setNumDrivers(e.target.value)} style={styles.input} />
            </div>
            <div>
              <label style={styles.label}>Route start time</label>
              <input type="time" value={routeStartTime} onChange={e => setRouteStartTime(e.target.value)} style={styles.input} />
            </div>
            <div>
              <label style={styles.label}>Max hours / driver</label>
              <input type="number" min="1" value={maxHours} onChange={e => setMaxHours(e.target.value)} style={styles.input} />
            </div>
          </div>

          <div style={styles.flex}>
            <button
              onClick={run}
              style={loading ? { ...styles.button, ...styles.buttonDisabled } : styles.button}
              disabled={loading}
            >
              {loading ? 'Running...' : 'Run Simulation'}
            </button>
            <button
              onClick={() => { setResult(null); setError(null) }}
              style={styles.buttonReset}
            >
              Reset
            </button>
            {result?.simulationId && <div style={styles.simId}>Saved — id: {String(result.simulationId).slice(0,8)}</div>}
          </div>

          {error && <div style={styles.error}>{error}</div>}
        </div>

        <div style={styles.card}>
          <div style={styles.summaryLabel}>Summary</div>
          <div style={styles.summaryValue}>{toCurrency(totalProfit)}</div>
          <div style={styles.summarySub}>Efficiency: {efficiency}%</div>
          <div style={{ ...styles.summaryLabel, marginTop: '0.75rem' }}>On-time / Late</div>
          <div style={styles.summaryOnTime}>{onTime} / {late}</div>
        </div>
      </div>

      <div>
        <OrdersTable rows={result?.perOrderResults ?? []} />
      </div>
    </div>
  )
}

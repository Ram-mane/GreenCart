import React, { useEffect, useState } from 'react'
import api from '../api/apiClient'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  title: {
    fontSize: '1.125rem',
    fontWeight: 600,
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  loading: {
    fontSize: '0.875rem',
    color: '#6b7280',
  },
  empty: {
    fontSize: '0.875rem',
    color: '#9ca3af',
  },
  card: {
    border: '1px solid #e5e7eb',
    borderRadius: '0.5rem',
    padding: '1rem',
    background: '#fff',
    boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontWeight: 500,
  },
  cardSubtitle: {
    fontSize: '0.875rem',
    color: '#6b7280',
  },
  cardDrivers: {
    fontSize: '0.875rem',
    color: '#9ca3af',
  },
}

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
    <div style={styles.container}>
      <div style={styles.title}>Simulations History</div>
      <div style={styles.list}>
        {loading && <div style={styles.loading}>Loading...</div>}
        {list.length === 0 && !loading && <div style={styles.empty}>No simulations yet</div>}
        {list.map(sim => (
          <div key={sim._id} style={styles.card}>
            <div style={styles.cardHeader}>
              <div>
                <div style={styles.cardTitle}>Created: {new Date(sim.createdAt).toLocaleString()}</div>
                <div style={styles.cardSubtitle}>
                  Profit: ₹{sim.KPIs?.totalProfit ?? 0} • Efficiency: {sim.KPIs?.efficiency ?? 0}%
                </div>
              </div>
              <div style={styles.cardDrivers}>{sim.input?.numDrivers} drivers</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

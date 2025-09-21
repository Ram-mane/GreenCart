import React from 'react'
import { toCurrency } from '../utils/format'

const styles = {
  card: {
    flex: 1,
    minWidth: 0,
    background: '#fff',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
    display: 'flex',
    flexDirection: 'column',
    margin: '8px 0',
  },
  title: {
    fontSize: '0.875rem',
    color: '#6b7280',
  },
  value: {
    marginTop: '8px',
    fontSize: '2rem',
    fontWeight: 600,
  },
  sub: {
    marginTop: '4px',
    fontSize: '0.75rem',
    color: '#9ca3af',
  },
}

export default function KPI({ title, value, sub }) {
  return (
    <div style={styles.card}>
      <div style={styles.title}>{title}</div>
      <div style={styles.value}>{typeof value === 'number' ? toCurrency(value) : value}</div>
      {sub && <div style={styles.sub}>{sub}</div>}
    </div>
  )
}

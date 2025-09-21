import React from 'react'
import { toCurrency } from '../utils/format'

const styles = {
  card: {
    overflowX: 'auto',
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    padding: '16px',
    margin: '16px 0',
  },
  table: {
    minWidth: '100%',
    textAlign: 'left',
    borderCollapse: 'collapse',
    fontFamily: 'inherit',
  },
  th: {
    padding: '8px',
    fontSize: '12px',
    color: '#6b7280',
    fontWeight: 'bold',
    borderBottom: '1px solid #e5e7eb',
    background: '#f9fafb',
  },
  td: {
    padding: '8px',
    fontSize: '14px',
    borderTop: '1px solid #e5e7eb',
  },
  late: { color: '#dc2626' },
  onTime: { color: '#16a34a' },
  profit: { fontWeight: 600 },
  empty: {
    padding: '24px 8px',
    textAlign: 'center',
    color: '#9ca3af',
  },
}

export default function OrdersTable({ rows = [] }) {
  return (
    <div style={styles.card}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Order</th>
            <th style={styles.th}>Driver</th>
            <th style={styles.th}>Time (min)</th>
            <th style={styles.th}>On-time</th>
            <th style={styles.th}>Fuel</th>
            <th style={styles.th}>Penalty</th>
            <th style={styles.th}>Bonus</th>
            <th style={styles.th}>Profit</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td style={styles.td}>{r.orderId}</td>
              <td style={styles.td}>{r.driver_name || r.driverName || r.driverId || '—'}</td>
              <td style={styles.td}>{r.simulatedTime ?? '—'}</td>
              <td style={styles.td}>
                {r.isLate
                  ? <span style={styles.late}>Late</span>
                  : <span style={styles.onTime}>On time</span>
                }
              </td>
              <td style={styles.td}>{toCurrency(r.fuelCost)}</td>
              <td style={styles.td}>{toCurrency(r.penalty)}</td>
              <td style={styles.td}>{toCurrency(r.bonus)}</td>
              <td style={{ ...styles.td, ...styles.profit }}>{toCurrency(r.profit)}</td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan="8" style={styles.empty}>Run a simulation to see results</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

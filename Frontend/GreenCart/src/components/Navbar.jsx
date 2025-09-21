import React from 'react'
import { NavLink } from 'react-router-dom'

const styles = {
  nav: {
    background: '#fff',
    borderBottom: '1px solid #e5e7eb',
  },
  container: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logoCircle: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    background: '#22c55e',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  brand: {
    fontWeight: 600,
  },
  subtitle: {
    fontSize: 12,
    color: '#6b7280',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  link: {
    padding: '8px 12px',
    borderRadius: 6,
    color: '#374151',
    textDecoration: 'none',
    transition: 'background 0.2s',
  },
  linkActive: {
    background: '#22c55e',
    color: '#fff',
  },
  linkHover: {
    background: '#f3f4f6',
  },
}

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <div style={styles.logoBox}>
          <div style={styles.logoCircle}>GC</div>
          <div>
            <div style={styles.brand}>GreenCart</div>
            <div style={styles.subtitle}>Logistics Simulator</div>
          </div>
        </div>

        <div style={styles.navLinks}>
          <NavLink
            to="/simulation"
            style={({ isActive }) =>
              isActive
                ? { ...styles.link, ...styles.linkActive }
                : styles.link
            }
          >
            Simulation
          </NavLink>
          <NavLink
            to="/dashboard"
            style={({ isActive }) =>
              isActive
                ? { ...styles.link, ...styles.linkActive }
                : styles.link
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/history"
            style={({ isActive }) =>
              isActive
                ? { ...styles.link, ...styles.linkActive }
                : styles.link
            }
          >
            History
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

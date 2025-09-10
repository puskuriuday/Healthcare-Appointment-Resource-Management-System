import React from 'react'
import { useAuth } from '../hooks/useAuth'

const Stat: React.FC<{ label: string; value: string; accent?: string; hint?: string }> = ({ label, value, accent, hint }) => (
  <div className="card fade-in" style={{ display:'flex', flexDirection:'column', gap:'.55rem' }}>
    <div style={{ fontSize:'.7rem', letterSpacing:'.08em', textTransform:'uppercase', fontWeight:600, opacity:.75 }}>{label}</div>
    <div style={{ fontSize:'1.55rem', fontWeight:600, background: accent ? `linear-gradient(90deg,var(--color-primary),${accent})` : 'none', WebkitBackgroundClip: accent ? 'text' : undefined, color: accent ? 'transparent' : 'inherit' }}>{value}</div>
    {hint && <div style={{ fontSize:'.65rem', opacity:.6 }}>{hint}</div>}
  </div>
)

export const DashboardPage: React.FC = () => {
  const { user } = useAuth()
  return (
    <div className="fade-in">
      <h1 style={{ margin:'0 0 .5rem', fontSize:'1.65rem', letterSpacing:'.5px' }}>Dashboard</h1>
      <p style={{ margin:'0 0 1.25rem', fontSize:'.9rem', opacity:.75 }}>Welcome {user?.email}</p>
      <div className="grid">
        <Stat label="Active Appointments" value="12" accent="var(--color-success)" hint="Next 24h" />
        <Stat label="Inventory Alerts" value="3" accent="var(--color-danger)" hint="Need restock" />
        <Stat label="Unpaid Invoices" value="5" accent="var(--color-warning)" hint="Awaiting payment" />
        <Stat label="Unread Notifications" value="8" accent="var(--color-primary)" hint="Last 7 days" />
      </div>
      <div style={{ marginTop:'2rem', display:'grid', gap:'1.1rem', gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))' }}>
        <div className="card fade-in" style={{ minHeight:180 }}>
          <h3 style={{ margin:'0 0 .75rem', fontSize:'.95rem' }}>Recent Appointments</h3>
          <div className="shimmer" style={{ height:6, borderRadius:4, width:'85%', margin:'0 0 .55rem' }} />
          <div className="shimmer" style={{ height:6, borderRadius:4, width:'70%', margin:'0 0 .55rem' }} />
          <div className="shimmer" style={{ height:6, borderRadius:4, width:'60%' }} />
        </div>
        <div className="card fade-in" style={{ minHeight:180 }}>
          <h3 style={{ margin:'0 0 .75rem', fontSize:'.95rem' }}>Inventory Overview</h3>
          <div className="shimmer" style={{ height:6, borderRadius:4, width:'75%', margin:'0 0 .55rem' }} />
          <div className="shimmer" style={{ height:6, borderRadius:4, width:'55%', margin:'0 0 .55rem' }} />
          <div className="shimmer" style={{ height:6, borderRadius:4, width:'40%' }} />
        </div>
        <div className="card fade-in" style={{ minHeight:180 }}>
          <h3 style={{ margin:'0 0 .75rem', fontSize:'.95rem' }}>Billing Velocity</h3>
          <div className="shimmer" style={{ height:6, borderRadius:4, width:'60%', margin:'0 0 .55rem' }} />
          <div className="shimmer" style={{ height:6, borderRadius:4, width:'45%', margin:'0 0 .55rem' }} />
          <div className="shimmer" style={{ height:6, borderRadius:4, width:'30%' }} />
        </div>
        <div className="card fade-in" style={{ minHeight:180 }}>
          <h3 style={{ margin:'0 0 .75rem', fontSize:'.95rem' }}>Engagement</h3>
          <div className="shimmer" style={{ height:6, borderRadius:4, width:'50%', margin:'0 0 .55rem' }} />
          <div className="shimmer" style={{ height:6, borderRadius:4, width:'35%', margin:'0 0 .55rem' }} />
          <div className="shimmer" style={{ height:6, borderRadius:4, width:'25%' }} />
        </div>
      </div>
    </div>
  )
}

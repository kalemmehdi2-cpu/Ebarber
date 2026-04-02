'use client'
import { useState } from 'react'
import Link from 'next/link'

const MOCK_BARBERS = [
  { id: '1', full_name: 'Karim Diallo', specialty: 'Fade & Design', city: 'Paris', verified: false, created_at: '2026-04-01', email: 'karim@email.com' },
  { id: '2', full_name: 'Youssef Ben Ali', specialty: 'Barbe & Rasage', city: 'Lyon', verified: true, created_at: '2026-03-28', email: 'youssef@email.com' },
  { id: '3', full_name: 'Marcus Osei', specialty: 'Afro & Locks', city: 'Marseille', verified: false, created_at: '2026-04-02', email: 'marcus@email.com' },
]
const MOCK_CLIENTS = [
  { id: '1', full_name: 'Mehdi B.', city: 'Paris', created_at: '2026-03-15', email: 'mehdi@email.com' },
  { id: '2', full_name: 'Jordan M.', city: 'Lyon', created_at: '2026-03-20', email: 'jordan@email.com' },
]

export default function AdminPage() {
  const [tab, setTab] = useState<'barbers' | 'clients' | 'bookings'>('barbers')
  const [barbers, setBarbers] = useState(MOCK_BARBERS)
  const clients = MOCK_CLIENTS

  const verifyBarber = (id: string) => setBarbers(prev => prev.map(b => b.id === id ? { ...b, verified: true } : b))
  const rejectBarber = (id: string) => setBarbers(prev => prev.filter(b => b.id !== id))

  const card = { background: '#141414', borderRadius: 16, border: '1px solid #1f1f1f', padding: 20 }

  return (
    <div style={{ minHeight: '100vh', background: '#080808', color: '#F2F2F2', fontFamily: 'Inter, sans-serif', display: 'flex' }}>
      <aside style={{ width: 240, minHeight: '100vh', background: '#0f0f0f', borderRight: '1px solid #1f1f1f', padding: '24px 16px', position: 'fixed' as const }}>
        <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 800, marginBottom: 40, paddingLeft: 8 }}>
          E<span style={{ color: '#C9A84C' }}>-</span>Barber <span style={{ fontSize: 12, color: '#777', fontFamily: 'Inter, sans-serif' }}>Admin</span>
        </div>
        {[
          { id: 'barbers', label: '✂️ Barbiers', count: barbers.length },
          { id: 'clients', label: '👤 Clients', count: clients.length },
          { id: 'bookings', label: '📅 Réservations', count: 0 },
        ].map(item => (
          <button key={item.id} onClick={() => setTab(item.id as any)}
            style={{ width: '100%', padding: '12px 16px', borderRadius: 10, border: 'none', background: tab === item.id ? '#1f1f1f' : 'transparent', color: tab === item.id ? '#F2F2F2' : '#777', fontSize: 14, fontWeight: 600, cursor: 'pointer', textAlign: 'left' as const, fontFamily: 'Inter, sans-serif', marginBottom: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{item.label}</span>
            <span style={{ background: '#2a2a2a', borderRadius: 10, padding: '2px 8px', fontSize: 11 }}>{item.count}</span>
          </button>
        ))}
        <div style={{ position: 'absolute' as const, bottom: 24, left: 16 }}>
          <Link href="/" style={{ color: '#777', textDecoration: 'none', fontSize: 13 }}>← Retour au site</Link>
        </div>
      </aside>
      <main style={{ marginLeft: 240, flex: 1, padding: 32 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { label: 'Barbiers total', val: barbers.length, color: '#C9A84C' },
            { label: 'En attente', val: barbers.filter(b => !b.verified).length, color: '#F59E0B' },
            { label: 'Clients inscrits', val: clients.length, color: '#22C55E' },
            { label: 'Réservations', val: 0, color: '#3B82F6' },
          ].map(s => (
            <div key={s.label} style={card}>
              <div style={{ fontSize: 32, fontWeight: 800, color: s.color, fontFamily: 'Syne, sans-serif' }}>{s.val}</div>
              <div style={{ fontSize: 13, color: '#777', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {tab === 'barbers' && (
          <div>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 800, marginBottom: 20 }}>Gestion des barbiers</h2>
            {barbers.filter(b => !b.verified).length > 0 && (
              <div style={{ marginBottom: 32 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#F59E0B', letterSpacing: 0.8, textTransform: 'uppercase' as const, marginBottom: 12 }}>
                  ⏳ En attente ({barbers.filter(b => !b.verified).length})
                </div>
                {barbers.filter(b => !b.verified).map(b => (
                  <div key={b.id} style={{ ...card, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 16, borderColor: '#6B5420' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 22, background: '#1E3A5F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#fff', fontFamily: 'Syne, sans-serif' }}>
                      {b.full_name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700 }}>{b.full_name}</div>
                      <div style={{ fontSize: 13, color: '#777' }}>{b.specialty} · {b.city} · {b.email}</div>
                      <div style={{ fontSize: 12, color: '#555', marginTop: 2 }}>Inscrit le {new Date(b.created_at).toLocaleDateString('fr-FR')}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => verifyBarber(b.id)}
                        style={{ background: '#22C55E', color: '#000', fontWeight: 700, fontSize: 13, padding: '8px 16px', borderRadius: 10, border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                        ✅ Valider
                      </button>
                      <button onClick={() => rejectBarber(b.id)}
                        style={{ background: '#EF4444', color: '#fff', fontWeight: 700, fontSize: 13, padding: '8px 16px', borderRadius: 10, border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                        ❌ Refuser
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#22C55E', letterSpacing: 0.8, textTransform: 'uppercase' as const, marginBottom: 12 }}>
                ✅ Validés ({barbers.filter(b => b.verified).length})
              </div>
              {barbers.filter(b => b.verified).map(b => (
                <div key={b.id} style={{ ...card, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 22, background: '#1A3A2A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#fff', fontFamily: 'Syne, sans-serif' }}>
                    {b.full_name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700 }}>{b.full_name}</div>
                    <div style={{ fontSize: 13, color: '#777' }}>{b.specialty} · {b.city}</div>
                  </div>
                  <span style={{ background: '#052010', border: '1px solid #22C55E', color: '#22C55E', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20 }}>Vérifié ✓</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'clients' && (
          <div>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 800, marginBottom: 20 }}>Clients inscrits</h2>
            {clients.map(c => (
              <div key={c.id} style={{ ...card, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 22, background: '#2A1A3B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#fff', fontFamily: 'Syne, sans-serif' }}>
                  {c.full_name.split(' ').map(n => n[0]).join('')}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700 }}>{c.full_name}</div>
                  <div style={{ fontSize: 13, color: '#777' }}>{c.email} · {c.city}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'bookings' && (
          <div style={{ ...card, textAlign: 'center' as const, padding: 60, color: '#777' }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>📅</div>
            <p>Les réservations apparaîtront ici</p>
          </div>
        )}
      </main>
    </div>
  )
}

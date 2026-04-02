'use client'
import { useState } from 'react'
import Link from 'next/link'

const MOCK_APPTS = [
  { id: '1', client: 'Mehdi B.', service: 'Coupe + Barbe', time: '14:30', date: '2026-04-02', address: '12 rue de la Paix, Paris 1er', price: 33, status: 'confirmed' },
  { id: '2', client: 'Jordan M.', service: 'Fade', time: '16:00', date: '2026-04-02', address: '5 av. Victor Hugo, Paris 16e', price: 30, status: 'pending' },
]

export default function BarberDashboard() {
  const [tab, setTab] = useState<'today' | 'services' | 'profile'>('today')
  const [available, setAvailable] = useState(true)
  const [appts, setAppts] = useState(MOCK_APPTS)
  const [services, setServices] = useState([
    { id: '1', name: 'Coupe simple', price: 25, duration: 30 },
    { id: '2', name: 'Coupe + Barbe', price: 33, duration: 45 },
    { id: '3', name: 'Dégradé / Fade', price: 30, duration: 40 },
    { id: '4', name: 'Design & Ligne', price: 35, duration: 35 },
  ])
  const [newService, setNewService] = useState({ name: '', price: '', duration: '30' })

  const updateStatus = (id: string, status: string) => setAppts(prev => prev.map(a => a.id === id ? { ...a, status } : a))
  const today = new Date().toISOString().split('T')[0]
  const todayAppts = appts.filter(a => a.date === today)
  const earnings = todayAppts.filter(a => a.status === 'confirmed').reduce((acc, a) => acc + a.price, 0)

  const card = { background: '#141414', borderRadius: 16, border: '1px solid #1f1f1f', padding: 20 }
  const inp = { background: '#0f0f0f', border: '1px solid #1f1f1f', borderRadius: 10, padding: '10px 14px', color: '#F2F2F2', fontSize: 14, outline: 'none', fontFamily: 'Inter, sans-serif' }

  return (
    <div style={{ minHeight: '100vh', background: '#080808', color: '#F2F2F2', fontFamily: 'Inter, sans-serif' }}>
      <nav style={{ padding: '16px 24px', borderBottom: '1px solid #1f1f1f', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 800, color: '#F2F2F2', textDecoration: 'none' }}>E<span style={{ color: '#C9A84C' }}>-</span>Barber</Link>
        <button onClick={() => setAvailable(a => !a)}
          style={{ display: 'flex', alignItems: 'center', gap: 8, background: available ? '#052010' : '#1a1a1a', border: `1px solid ${available ? '#22C55E' : '#1f1f1f'}`, borderRadius: 20, padding: '8px 16px', cursor: 'pointer', color: available ? '#22C55E' : '#777', fontSize: 13, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>
          <span style={{ width: 8, height: 8, borderRadius: 4, background: available ? '#22C55E' : '#555', display: 'inline-block' }} />
          {available ? 'Disponible' : 'Indisponible'}
        </button>
      </nav>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
          <div style={{ ...card, background: 'linear-gradient(135deg, #1a1200, #141414)', borderColor: '#6B5420' }}>
            <div style={{ fontSize: 11, color: '#C9A84C', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' as const, marginBottom: 8 }}>Gains aujourd'hui</div>
            <div style={{ fontSize: 40, fontWeight: 800, color: '#C9A84C', fontFamily: 'Syne, sans-serif' }}>€{earnings}</div>
          </div>
          <div style={card}>
            <div style={{ fontSize: 11, color: '#777', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' as const, marginBottom: 8 }}>RDV aujourd'hui</div>
            <div style={{ fontSize: 40, fontWeight: 800, fontFamily: 'Syne, sans-serif' }}>{todayAppts.length}</div>
          </div>
          <div style={card}>
            <div style={{ fontSize: 11, color: '#777', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' as const, marginBottom: 8 }}>En attente</div>
            <div style={{ fontSize: 40, fontWeight: 800, fontFamily: 'Syne, sans-serif', color: '#F59E0B' }}>{appts.filter(a => a.status === 'pending').length}</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 4, marginBottom: 28, background: '#0f0f0f', borderRadius: 12, padding: 4, width: 'fit-content' }}>
          {[['today', "📅 Aujourd'hui"], ['services', '✂️ Prestations'], ['profile', '👤 Profil']].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id as any)}
              style={{ padding: '10px 20px', borderRadius: 10, border: 'none', background: tab === id ? '#1f1f1f' : 'transparent', color: tab === id ? '#F2F2F2' : '#777', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
              {label}
            </button>
          ))}
        </div>

        {tab === 'today' && (
          <div>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 800, marginBottom: 16 }}>Rendez-vous du jour</h2>
            {todayAppts.length === 0
              ? <div style={{ ...card, textAlign: 'center' as const, padding: 60, color: '#777' }}><div style={{ fontSize: 40, marginBottom: 12 }}>📅</div><p>Aucun rendez-vous aujourd'hui</p></div>
              : todayAppts.map(a => (
                <div key={a.id} style={{ ...card, marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 16 }}>{a.client}</div>
                      <div style={{ color: '#777', fontSize: 13, marginTop: 2 }}>{a.service}</div>
                    </div>
                    <div style={{ textAlign: 'right' as const }}>
                      <div style={{ fontSize: 20, fontWeight: 800, color: '#C9A84C' }}>€{a.price}</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: a.status === 'confirmed' ? '#22C55E' : '#F59E0B', marginTop: 2 }}>
                        {a.status === 'confirmed' ? '✅ Confirmé' : '⏳ En attente'}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 16, padding: '10px 0', borderTop: '1px solid #1f1f1f', fontSize: 13, color: '#777' }}>
                    <span>🕐 {a.time}</span><span>📍 {a.address}</span>
                  </div>
                  {a.status === 'pending' && (
                    <div style={{ display: 'flex', gap: 8, paddingTop: 12 }}>
                      <button onClick={() => updateStatus(a.id, 'confirmed')}
                        style={{ flex: 1, background: 'linear-gradient(135deg, #C9A84C, #E8C97A)', color: '#000', fontWeight: 700, padding: '10px', borderRadius: 10, border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                        ✅ Accepter
                      </button>
                      <button onClick={() => updateStatus(a.id, 'cancelled')}
                        style={{ flex: 1, background: 'transparent', color: '#F2F2F2', fontWeight: 600, padding: '10px', borderRadius: 10, border: '1px solid #1f1f1f', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                        ❌ Refuser
                      </button>
                    </div>
                  )}
                </div>
              ))
            }
          </div>
        )}

        {tab === 'services' && (
          <div>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 800, marginBottom: 16 }}>Mes prestations</h2>
            {services.map(s => (
              <div key={s.id} style={{ ...card, marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700 }}>{s.name}</div>
                  <div style={{ fontSize: 13, color: '#777', marginTop: 2 }}>⏱ {s.duration} min</div>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <span style={{ fontSize: 18, fontWeight: 800, color: '#C9A84C' }}>€{s.price}</span>
                  <button onClick={() => setServices(prev => prev.filter(x => x.id !== s.id))}
                    style={{ background: 'transparent', border: '1px solid #EF4444', color: '#EF4444', borderRadius: 8, padding: '6px 12px', fontSize: 12, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
            <div style={{ ...card, marginTop: 20, borderColor: '#6B5420' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#C9A84C', marginBottom: 14, letterSpacing: 0.8, textTransform: 'uppercase' as const }}>+ Ajouter une prestation</div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' as const }}>
                <input style={{ ...inp, flex: 2, minWidth: 140 }} placeholder="Nom de la prestation" value={newService.name} onChange={e => setNewService(p => ({ ...p, name: e.target.value }))} />
                <input style={{ ...inp, width: 100 }} type="number" placeholder="Prix €" value={newService.price} onChange={e => setNewService(p => ({ ...p, price: e.target.value }))} />
                <input style={{ ...inp, width: 100 }} type="number" placeholder="Durée min" value={newService.duration} onChange={e => setNewService(p => ({ ...p, duration: e.target.value }))} />
                <button onClick={() => {
                  if (!newService.name || !newService.price) return
                  setServices(prev => [...prev, { id: Date.now().toString(), name: newService.name, price: parseInt(newService.price), duration: parseInt(newService.duration) }])
                  setNewService({ name: '', price: '', duration: '30' })
                }} style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C97A)', color: '#000', fontWeight: 700, padding: '10px 20px', borderRadius: 10, border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        )}

        {tab === 'profile' && (
          <div style={{ ...card, textAlign: 'center' as const, padding: 60, color: '#777' }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>👤</div>
            <p>Gestion du profil bientôt disponible</p>
          </div>
        )}
      </div>
    </div>
  )
}

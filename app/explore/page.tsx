'use client'
import { useState } from 'react'
import Link from 'next/link'

const MOCK = [
  { id: '1', full_name: 'Karim Diallo', specialty: 'Fade & Design', rating: 4.9, review_count: 312, base_price: 25, available: true, city: 'Paris', initials: 'KD', color: '#1E3A5F', tags: ['Fade', 'Barbe', 'Design'] },
  { id: '2', full_name: 'Youssef Ben Ali', specialty: 'Barbe & Rasage', rating: 4.8, review_count: 198, base_price: 20, available: true, city: 'Lyon', initials: 'YB', color: '#3B1F2B', tags: ['Barbe', 'Rasage'] },
  { id: '3', full_name: 'Marcus Osei', specialty: 'Afro & Locks', rating: 4.7, review_count: 445, base_price: 30, available: false, city: 'Marseille', initials: 'MO', color: '#1A3A2A', tags: ['Afro', 'Locks'] },
  { id: '4', full_name: 'Amine Chraibi', specialty: 'Coupe Classique', rating: 4.6, review_count: 87, base_price: 18, available: true, city: 'Paris', initials: 'AC', color: '#2A1A3B', tags: ['Classique'] },
]
const TAGS = ['Tous', 'Fade', 'Barbe', 'Rasage', 'Afro', 'Locks', 'Design', 'Classique']
const CITIES = ['Toute la France', 'Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Toulouse', 'Nantes']

export default function ExplorePage() {
  const [search, setSearch] = useState('')
  const [tag, setTag] = useState('Tous')
  const [city, setCity] = useState('Toute la France')

  const filtered = MOCK.filter(b => {
    const mq = b.full_name.toLowerCase().includes(search.toLowerCase()) || b.specialty.toLowerCase().includes(search.toLowerCase())
    const mt = tag === 'Tous' || b.tags.includes(tag)
    const mc = city === 'Toute la France' || b.city === city
    return mq && mt && mc
  })

  const inp = { background: '#141414', border: '1px solid #1f1f1f', borderRadius: 12, padding: '12px 16px', color: '#F2F2F2', fontSize: 14, outline: 'none', fontFamily: 'Inter, sans-serif' }

  return (
    <div style={{ minHeight: '100vh', background: '#080808', color: '#F2F2F2', fontFamily: 'Inter, sans-serif' }}>
      <nav style={{ padding: '16px 24px', borderBottom: '1px solid #1f1f1f', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: '#080808', zIndex: 100 }}>
        <Link href="/" style={{ fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 800, color: '#F2F2F2', textDecoration: 'none' }}>E<span style={{ color: '#C9A84C' }}>-</span>Barber</Link>
        <div style={{ display: 'flex', gap: 12 }}>
          <Link href="/profile" style={{ color: '#777', textDecoration: 'none', fontSize: 14 }}>Mon profil</Link>
          <Link href="/bookings" style={{ color: '#777', textDecoration: 'none', fontSize: 14 }}>Mes réservations</Link>
        </div>
      </nav>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Trouver un coiffeur</h1>
          <p style={{ color: '#777', fontSize: 15 }}>Les meilleurs coiffeurs disponibles près de chez vous</p>
        </div>
        <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' as const }}>
          <div style={{ position: 'relative' as const, flex: 1, minWidth: 200 }}>
            <span style={{ position: 'absolute' as const, left: 14, top: '50%', transform: 'translateY(-50%)', color: '#777' }}>🔍</span>
            <input style={{ ...inp, width: '100%', paddingLeft: 44 }} placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select style={{ ...inp, cursor: 'pointer' }} value={city} onChange={e => setCity(e.target.value)}>
            {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' as const }}>
          {TAGS.map(t => (
            <button key={t} onClick={() => setTag(t)}
              style={{ padding: '8px 16px', borderRadius: 20, border: `1px solid ${tag === t ? '#C9A84C' : '#1f1f1f'}`, background: tag === t ? '#C9A84C' : 'transparent', color: tag === t ? '#000' : '#777', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
              {t}
            </button>
          ))}
        </div>
        <p style={{ color: '#777', fontSize: 14, marginBottom: 20 }}>{filtered.length} coiffeur{filtered.length > 1 ? 's' : ''} trouvé{filtered.length > 1 ? 's' : ''}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {filtered.map(b => (
            <Link key={b.id} href={`/barbers/${b.id}`} style={{ textDecoration: 'none' }}>
              <div style={{ background: '#141414', borderRadius: 18, border: '1px solid #1f1f1f', padding: 20, cursor: 'pointer', transition: 'border-color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#6B5420')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = '#1f1f1f')}>
                <div style={{ display: 'flex', gap: 14, marginBottom: 14 }}>
                  <div style={{ position: 'relative' as const }}>
                    <div style={{ width: 52, height: 52, borderRadius: 26, background: b.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 800, color: '#fff', fontFamily: 'Syne, sans-serif' }}>{b.initials}</div>
                    {b.available && <div style={{ position: 'absolute' as const, bottom: 0, right: 0, width: 13, height: 13, borderRadius: 7, background: '#22C55E', border: '2px solid #141414' }} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 15, color: '#F2F2F2' }}>{b.full_name}</div>
                    <div style={{ color: '#777', fontSize: 13, marginTop: 2 }}>{b.specialty}</div>
                  </div>
                  <div style={{ textAlign: 'right' as const }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#C9A84C' }}>€{b.base_price}</div>
                    <div style={{ fontSize: 11, color: '#777' }}>/ séance</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <span style={{ color: '#C9A84C', fontSize: 13 }}>{'★'.repeat(Math.round(b.rating))}</span>
                  <span style={{ fontSize: 12, color: '#777' }}>{b.rating} ({b.review_count}) · {b.city}</span>
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' as const }}>
                  {b.tags.map(t => <span key={t} style={{ fontSize: 11, padding: '3px 8px', background: '#0f0f0f', borderRadius: 8, color: '#777', border: '1px solid #1f1f1f' }}>{t}</span>)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

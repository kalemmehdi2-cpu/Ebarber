'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

function useCountUp(target: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime: number
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [target, duration, start])
  return count
}

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)
  const [statsVisible, setStatsVisible] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const barbiers = useCountUp(500, 2000, statsVisible)
  const clients = useCountUp(50000, 2000, statsVisible)
  const rating = useCountUp(49, 2000, statsVisible)
  const cities = useCountUp(20, 2000, statsVisible)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setStatsVisible(true)
    }, { threshold: 0.3 })
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  const BARBERS = [
    { name: 'Karim D.', spec: 'Fade & Design', rating: '4.9', price: '25', city: 'Paris', avail: true, emoji: '✂️', bg: 'linear-gradient(135deg, #1a2744, #0d1b3e)' },
    { name: 'Youssef B.', spec: 'Barbe & Rasage', rating: '4.8', price: '20', city: 'Lyon', avail: true, emoji: '🪒', bg: 'linear-gradient(135deg, #1a3a2a, #0d2218)' },
    { name: 'Marcus O.', spec: 'Afro & Locks', rating: '4.7', price: '30', city: 'Marseille', avail: false, emoji: '💈', bg: 'linear-gradient(135deg, #2a1a3b, #1a0d2e)' },
    { name: 'Amine C.', spec: 'Coupe Classique', rating: '4.6', price: '18', city: 'Bordeaux', avail: true, emoji: '✂️', bg: 'linear-gradient(135deg, #3b1f0d, #2a1408)' },
  ]

  return (
    <div style={{ background: '#F8F9FF', minHeight: '100vh', fontFamily: 'Inter, sans-serif', color: '#0A0F2C', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0%,100% { transform: translateY(0px) rotate(-3deg); } 50% { transform: translateY(-12px) rotate(-3deg); } }
        @keyframes float2 { 0%,100% { transform: translateY(0px) rotate(5deg); } 50% { transform: translateY(-8px) rotate(5deg); } }
        @keyframes pulse { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.7; transform: scale(1.05); } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        @keyframes slideIn { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
        .fade-up { animation: fadeUp 0.7s ease forwards; }
        .fade-up-2 { animation: fadeUp 0.7s ease 0.15s forwards; opacity: 0; }
        .fade-up-3 { animation: fadeUp 0.7s ease 0.3s forwards; opacity: 0; }
        .fade-up-4 { animation: fadeUp 0.7s ease 0.45s forwards; opacity: 0; }
        .float { animation: float 4s ease-in-out infinite; }
        .float2 { animation: float2 5s ease-in-out infinite; }
        .card-hover { transition: all 0.3s cubic-bezier(0.4,0,0.2,1); }
        .card-hover:hover { transform: translateY(-8px); box-shadow: 0 20px 60px rgba(10,15,44,0.15); }
        .btn-primary { transition: all 0.2s ease; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(10,15,44,0.25); }
        .shimmer-text {
          background: linear-gradient(90deg, #0A0F2C 0%, #3B5BDB 50%, #0A0F2C 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }
        select option { background: #0A0F2C; color: white; }
      `}</style>

      {/* NAV */}
      <nav style={{
        padding: '0 40px', height: 70,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        background: scrollY > 20 ? 'rgba(248,249,255,0.95)' : 'transparent',
        backdropFilter: scrollY > 20 ? 'blur(20px)' : 'none',
        boxShadow: scrollY > 20 ? '0 1px 0 rgba(10,15,44,0.08)' : 'none',
        transition: 'all 0.3s ease',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 22 }}>💈</span>
          <span style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 800, color: '#0A0F2C' }}>E-Barber</span>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Link href="/auth/login" style={{ color: '#0A0F2C', textDecoration: 'none', fontSize: 14, fontWeight: 500, padding: '10px 18px', borderRadius: 10 }}>Connexion</Link>
          <Link href="/auth/register" className="btn-primary" style={{ background: '#0A0F2C', color: '#fff', padding: '11px 22px', borderRadius: 12, textDecoration: 'none', fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
            S'inscrire <span>→</span>
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #0A0F2C 0%, #1a2560 50%, #0d1b4e 100%)', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: 70 }}>
        {/* Background decorations */}
        <div style={{ position: 'absolute', top: '10%', right: '5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,91,219,0.3) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '5%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Floating icons */}
        <div className="float" style={{ position: 'absolute', top: '20%', right: '12%', fontSize: 64, opacity: 0.15 }}>✂️</div>
        <div className="float2" style={{ position: 'absolute', bottom: '25%', right: '8%', fontSize: 48, opacity: 0.12 }}>💈</div>
        <div className="float" style={{ position: 'absolute', top: '60%', left: '5%', fontSize: 40, opacity: 0.1 }}>🪒</div>

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center', width: '100%' }}>
          <div>
            <div className="fade-up" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 20, padding: '8px 16px', marginBottom: 28 }}>
              <span style={{ width: 8, height: 8, borderRadius: 4, background: '#4ade80', display: 'inline-block', animation: 'pulse 2s infinite' }} />
              <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 13, fontWeight: 600 }}>500+ barbiers disponibles en France</span>
            </div>
            <h1 className="fade-up-2" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(40px, 5vw, 68px)', fontWeight: 800, color: '#fff', lineHeight: 1.05, marginBottom: 24 }}>
              Votre barbier<br />
              <span style={{ background: 'linear-gradient(135deg, #7B9EFF, #B8CCFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>à domicile</span><br />
              en 1 clic
            </h1>
            <p className="fade-up-3" style={{ fontSize: 18, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: 40, maxWidth: 460 }}>
              Les meilleurs barbiers certifiés de France se déplacent chez vous. Réservez en 2 minutes, suivez en temps réel comme un Uber.
            </p>
            <div className="fade-up-4" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link href="/auth/register" className="btn-primary" style={{ background: '#fff', color: '#0A0F2C', padding: '16px 32px', borderRadius: 14, textDecoration: 'none', fontSize: 16, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 8 }}>
                ✂️ Réserver maintenant
              </Link>
              <Link href="/auth/register?role=barber" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '16px 28px', borderRadius: 14, textDecoration: 'none', fontSize: 15, fontWeight: 600, border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)' }}>
                Devenir barbier →
              </Link>
            </div>

            {/* Social proof */}
            <div className="fade-up-4" style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 40 }}>
              <div style={{ display: 'flex' }}>
                {['KD','YB','MO','AC'].map((i, idx) => (
                  <div key={i} style={{ width: 36, height: 36, borderRadius: 18, background: `hsl(${idx * 60 + 200}, 60%, 40%)`, border: '2px solid rgba(255,255,255,0.3)', marginLeft: idx > 0 ? -10 : 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff' }}>{i}</div>
                ))}
              </div>
              <div>
                <div style={{ display: 'flex', gap: 2 }}>{[...Array(5)].map((_,i) => <span key={i} style={{ color: '#FFD700', fontSize: 14 }}>★</span>)}</div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>+50 000 clients satisfaits</div>
              </div>
            </div>
          </div>

          {/* Floating barber cards */}
          <div style={{ position: 'relative', height: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Main card */}
            <div style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 24, padding: 24, width: 280, position: 'absolute', zIndex: 3 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
                <div style={{ width: 50, height: 50, borderRadius: 25, background: 'linear-gradient(135deg, #1a2744, #3B5BDB)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>✂️</div>
                <div>
                  <div style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>Karim Diallo</div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>Fade & Design</div>
                </div>
                <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                  <div style={{ color: '#FFD700', fontSize: 16, fontWeight: 800 }}>€25</div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: 14 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: '#fff', fontWeight: 700 }}>4.9</div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>Note</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: '#fff', fontWeight: 700 }}>312</div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>Avis</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: '#4ade80', fontWeight: 700, fontSize: 13 }}>● Dispo</div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>Maintenant</div>
                </div>
              </div>
              <div style={{ background: 'linear-gradient(135deg, #3B5BDB, #7B9EFF)', borderRadius: 12, padding: '12px', textAlign: 'center', color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
                📅 Réserver
              </div>
            </div>

            {/* Secondary cards */}
            <div className="float" style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(15px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 18, padding: 16, width: 200, position: 'absolute', top: 40, right: 0, zIndex: 2 }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>💈</div>
              <div style={{ color: '#fff', fontWeight: 600, fontSize: 14 }}>Youssef B.</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>Barbe & Rasage</div>
              <div style={{ display: 'flex', gap: 2, marginTop: 6 }}>{[...Array(5)].map((_,i) => <span key={i} style={{ color: '#FFD700', fontSize: 11 }}>★</span>)}</div>
            </div>

            <div className="float2" style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(15px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 18, padding: 16, width: 190, position: 'absolute', bottom: 60, left: 0, zIndex: 2 }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>🪒</div>
              <div style={{ color: '#fff', fontWeight: 600, fontSize: 14 }}>Marcus O.</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>Afro & Locks</div>
              <div style={{ color: '#FFD700', fontSize: 12, marginTop: 4 }}>★ 4.7</div>
            </div>

            {/* Live notification */}
            <div style={{ position: 'absolute', top: 10, left: -20, background: '#fff', borderRadius: 14, padding: '10px 16px', boxShadow: '0 8px 30px rgba(0,0,0,0.2)', zIndex: 4, display: 'flex', alignItems: 'center', gap: 10, animation: 'slideIn 0.5s ease 1s both' }}>
              <div style={{ width: 10, height: 10, borderRadius: 5, background: '#4ade80', animation: 'pulse 2s infinite' }} />
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#0A0F2C' }}>Réservation confirmée</div>
                <div style={{ fontSize: 11, color: '#666' }}>Il y a 2 min · Paris 8e</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section ref={statsRef} style={{ padding: '80px 40px', background: '#fff', borderBottom: '1px solid #eef0f8' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 40, textAlign: 'center' }}>
          {[
            { val: barbiers, suffix: '+', label: 'Barbiers certifiés', icon: '✂️' },
            { val: clients, suffix: '+', label: 'Clients satisfaits', icon: '👤' },
            { val: (rating / 10).toFixed(1), suffix: '★', label: 'Note moyenne', icon: '⭐' },
            { val: cities, suffix: ' villes', label: 'Villes couvertes', icon: '📍' },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 44, fontWeight: 800, color: '#0A0F2C', lineHeight: 1 }}>
                {s.val}{s.suffix}
              </div>
              <div style={{ color: '#8892B0', fontSize: 15, marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* BARBIERS CARDS */}
      <section style={{ padding: '100px 40px', background: '#F8F9FF' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ display: 'inline-block', background: '#EEF0FF', color: '#3B5BDB', fontSize: 13, fontWeight: 700, padding: '6px 16px', borderRadius: 20, marginBottom: 16, letterSpacing: 0.5 }}>
              ✂️ NOS BARBIERS
            </div>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 42, fontWeight: 800, color: '#0A0F2C', marginBottom: 16 }}>Les meilleurs barbiers<br />près de chez vous</h2>
            <p style={{ color: '#8892B0', fontSize: 17, maxWidth: 500, margin: '0 auto' }}>Chaque barbier est vérifié, noté et assuré. Qualité garantie.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 20 }}>
            {BARBERS.map((b, i) => (
              <div key={i} className="card-hover" style={{ borderRadius: 20, overflow: 'hidden', background: '#fff', border: '1px solid #eef0f8', boxShadow: '0 2px 12px rgba(10,15,44,0.06)', cursor: 'pointer' }}>
                <div style={{ background: b.bg, padding: '28px 24px 20px', position: 'relative' }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>{b.emoji}</div>
                  {b.avail && (
                    <div style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(74,222,128,0.2)', border: '1px solid rgba(74,222,128,0.4)', borderRadius: 20, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 5 }}>
                      <span style={{ width: 6, height: 6, borderRadius: 3, background: '#4ade80', display: 'inline-block' }} />
                      <span style={{ color: '#4ade80', fontSize: 11, fontWeight: 700 }}>Disponible</span>
                    </div>
                  )}
                  <div style={{ color: '#fff', fontWeight: 800, fontSize: 18, fontFamily: 'Syne, sans-serif' }}>{b.name}</div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, marginTop: 2 }}>{b.spec}</div>
                </div>
                <div style={{ padding: '16px 20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <div style={{ display: 'flex', gap: 2 }}>{[...Array(5)].map((_,i) => <span key={i} style={{ color: '#FFD700', fontSize: 13 }}>★</span>)}<span style={{ color: '#8892B0', fontSize: 13, marginLeft: 4 }}>{b.rating}</span></div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#0A0F2C' }}>€{b.price}<span style={{ fontSize: 12, color: '#8892B0', fontWeight: 400 }}>/séance</span></div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#8892B0', fontSize: 13, marginBottom: 14 }}>
                    <span>📍</span><span>{b.city}</span>
                  </div>
                  <Link href="/auth/register" style={{ display: 'block', background: '#0A0F2C', color: '#fff', textAlign: 'center', padding: '11px', borderRadius: 12, textDecoration: 'none', fontSize: 14, fontWeight: 700 }}>
                    Réserver
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href="/explore" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#3B5BDB', textDecoration: 'none', fontSize: 15, fontWeight: 700, border: '1px solid #3B5BDB', padding: '12px 28px', borderRadius: 12 }}>
              Voir tous les barbiers →
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: '100px 40px', background: '#0A0F2C' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ display: 'inline-block', background: 'rgba(123,158,255,0.15)', color: '#7B9EFF', fontSize: 13, fontWeight: 700, padding: '6px 16px', borderRadius: 20, marginBottom: 16 }}>COMMENT ÇA MARCHE</div>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 42, fontWeight: 800, color: '#fff' }}>Simple comme un Uber</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 24 }}>
            {[
              { n: '01', e: '📍', t: 'Localisez', d: 'Entrez votre adresse. On trouve les barbiers disponibles autour de vous.' },
              { n: '02', e: '✂️', t: 'Choisissez', d: 'Comparez les profils, avis et tarifs. Trouvez votre barbier idéal.' },
              { n: '03', e: '📅', t: 'Réservez', d: 'Sélectionnez votre créneau et payez en ligne. 2 minutes chrono.' },
              { n: '04', e: '🚗', t: 'Profitez', d: 'Votre barbier arrive chez vous. Suivez-le en temps réel.' },
            ].map(s => (
              <div key={s.n} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 28 }}>
                <div style={{ color: '#3B5BDB', fontSize: 12, fontWeight: 800, letterSpacing: 2, marginBottom: 20 }}>{s.n}</div>
                <div style={{ fontSize: 36, marginBottom: 14 }}>{s.e}</div>
                <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 10 }}>{s.t}</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, lineHeight: 1.7 }}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BARBIER */}
      <section style={{ padding: '100px 40px', background: '#F8F9FF' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', background: 'linear-gradient(135deg, #0A0F2C 0%, #1a2560 100%)', borderRadius: 28, padding: '70px 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -40, right: -40, fontSize: 180, opacity: 0.05 }}>✂️</div>
          <div style={{ position: 'absolute', bottom: -20, left: -20, fontSize: 120, opacity: 0.05 }}>💈</div>
          <div style={{ display: 'inline-block', background: 'rgba(123,158,255,0.15)', color: '#7B9EFF', fontSize: 13, fontWeight: 700, padding: '6px 16px', borderRadius: 20, marginBottom: 24 }}>BARBIERS</div>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 40, fontWeight: 800, color: '#fff', marginBottom: 20 }}>Développez votre clientèle</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 17, lineHeight: 1.7, marginBottom: 36, maxWidth: 480, margin: '0 auto 36px' }}>
            Rejoignez +500 barbiers sur E-Barber. Gérez vos horaires, prestations et revenus depuis votre dashboard.
          </p>
          <Link href="/auth/register?role=barber" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#fff', color: '#0A0F2C', padding: '16px 36px', borderRadius: 14, textDecoration: 'none', fontSize: 16, fontWeight: 800 }}>
            ✂️ Créer mon profil barbier →
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#0A0F2C', padding: '50px 40px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 20 }}>💈</span>
            <span style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 800, color: '#fff' }}>E-Barber</span>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>© 2026 E-Barber · Tous droits réservés</div>
          <div style={{ display: 'flex', gap: 20 }}>
            {['CGU', 'Confidentialité', 'Contact'].map(l => (
              <a key={l} href="#" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: 14 }}>{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}

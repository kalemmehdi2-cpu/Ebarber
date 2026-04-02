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

  const coiffeurs = useCountUp(500, 2000, statsVisible)
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

  const COIFFEURS = [
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
        @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
        @keyframes float2 { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
        @keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.7; transform:scale(1.05); } }
        @keyframes slideIn { from { opacity:0; transform:translateX(-20px); } to { opacity:1; transform:translateX(0); } }
        .fu1{animation:fadeUp .7s ease forwards;}
        .fu2{animation:fadeUp .7s ease .15s forwards;opacity:0;}
        .fu3{animation:fadeUp .7s ease .3s forwards;opacity:0;}
        .fu4{animation:fadeUp .7s ease .45s forwards;opacity:0;}
        .float{animation:float 4s ease-in-out infinite;}
        .float2{animation:float2 5s ease-in-out infinite;}
        .card-hover{transition:all .3s cubic-bezier(.4,0,.2,1);cursor:pointer;}
        .card-hover:hover{transform:translateY(-8px);box-shadow:0 20px 60px rgba(10,15,44,.15);}
        .btn-p{transition:all .2s ease;}
        .btn-p:hover{transform:translateY(-2px);box-shadow:0 10px 30px rgba(10,15,44,.25);}

        /* DESKTOP */
        .hero-grid{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;}
        .hero-cards-col{display:block;}

        /* MOBILE */
        @media(max-width:768px){
          .hero-section{min-height:100vh;position:relative;overflow:hidden;}
          .hero-grid{display:block !important;padding:80px 24px 60px !important;}
          .hero-text{position:relative;z-index:2;text-align:center;}
          .hero-cards-col{
            position:absolute !important;
            top:0;left:0;right:0;bottom:0;
            width:100%;height:100%;
            z-index:1;
            opacity:0.18;
            pointer-events:none;
            display:flex !important;
            align-items:center;
            justify-content:center;
          }
          .hero-notif{display:none !important;}
          .hero-btns{justify-content:center !important;flex-direction:column;align-items:center;}
          .hero-proof{justify-content:center !important;}
          .nav-links{display:none !important;}
          .nav-mobile{display:flex !important;}
          .stats-grid{grid-template-columns:repeat(2,1fr) !important;padding:50px 20px !important;gap:28px !important;}
          .coiffeurs-section{padding:60px 20px !important;}
          .coiffeurs-grid{grid-template-columns:repeat(2,1fr) !important;gap:12px !important;}
          .how-section{padding:60px 20px !important;}
          .how-grid{grid-template-columns:repeat(2,1fr) !important;gap:12px !important;}
          .cta-section{padding:60px 20px !important;}
          .cta-box{padding:40px 24px !important;}
          .cta-title{font-size:26px !important;}
          .hero-title{font-size:38px !important;line-height:1.1 !important;}
          .section-title{font-size:28px !important;}
          .footer-inner{flex-direction:column !important;align-items:center !important;text-align:center !important;}
        }
        @media(max-width:480px){
          .coiffeurs-grid{grid-template-columns:1fr !important;}
          .how-grid{grid-template-columns:1fr !important;}
          .hero-title{font-size:32px !important;}
        }
      `}</style>

      {/* NAV */}
      <nav style={{ height:64, position:'fixed', top:0, left:0, right:0, zIndex:200, background: scrollY>20?'rgba(248,249,255,0.95)':'transparent', backdropFilter:scrollY>20?'blur(20px)':'none', boxShadow:scrollY>20?'0 1px 0 rgba(10,15,44,0.08)':'none', transition:'all .3s ease' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 24px', height:'100%', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ fontSize:20 }}>💈</span>
            <span style={{ fontFamily:'Syne,sans-serif', fontSize:20, fontWeight:800, color:scrollY>20?'#0A0F2C':'#fff' }}>E-Barber</span>
          </div>
          <div className="nav-links" style={{ display:'flex', gap:8, alignItems:'center' }}>
            <Link href="/auth/login" style={{ color:scrollY>20?'#0A0F2C':'#fff', textDecoration:'none', fontSize:14, fontWeight:500, padding:'10px 18px' }}>Connexion</Link>
            <Link href="/auth/register" className="btn-p" style={{ background:'#0A0F2C', color:'#fff', padding:'11px 22px', borderRadius:12, textDecoration:'none', fontSize:14, fontWeight:700 }}>S'inscrire →</Link>
          </div>
          <Link href="/auth/register" style={{ background:'#0A0F2C', color:'#fff', padding:'9px 16px', borderRadius:10, textDecoration:'none', fontSize:13, fontWeight:700 }} className="nav-mobile">S'inscrire</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero-section" style={{ minHeight:'100vh', background:'linear-gradient(160deg,#0A0F2C 0%,#1a2560 50%,#0d1b4e 100%)', display:'flex', alignItems:'center', paddingTop:64, position:'relative' }}>
        <div style={{ position:'absolute', top:'10%', right:'5%', width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle,rgba(59,91,219,0.3) 0%,transparent 70%)', pointerEvents:'none' }} />

        <div className="hero-grid" style={{ maxWidth:1100, margin:'0 auto', padding:'80px 40px', width:'100%' }}>
          {/* TEXT — always on top on mobile */}
          <div className="hero-text">
            <div className="fu1" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.1)', backdropFilter:'blur(10px)', border:'1px solid rgba(255,255,255,0.15)', borderRadius:20, padding:'8px 16px', marginBottom:24 }}>
              <span style={{ width:8, height:8, borderRadius:4, background:'#4ade80', display:'inline-block', animation:'pulse 2s infinite' }} />
              <span style={{ color:'rgba(255,255,255,0.9)', fontSize:13, fontWeight:600 }}>500+ coiffeurs disponibles en France</span>
            </div>
            <h1 className="fu2 hero-title" style={{ fontFamily:'Syne,sans-serif', fontSize:64, fontWeight:800, color:'#fff', lineHeight:1.05, marginBottom:20 }}>
              Votre coiffeur<br />
              <span style={{ background:'linear-gradient(135deg,#7B9EFF,#B8CCFF)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>à domicile</span><br />
              en 1 clic
            </h1>
            <p className="fu3" style={{ fontSize:17, color:'rgba(255,255,255,0.65)', lineHeight:1.7, marginBottom:36, maxWidth:460 }}>
              Les meilleurs coiffeurs certifiés se déplacent chez vous. Réservez en 2 minutes, suivez en temps réel.
            </p>
            <div className="fu4 hero-btns" style={{ display:'flex', gap:12, flexWrap:'wrap', marginBottom:36 }}>
              <Link href="/auth/register" className="btn-p" style={{ background:'#fff', color:'#0A0F2C', padding:'15px 28px', borderRadius:14, textDecoration:'none', fontSize:15, fontWeight:800, display:'inline-flex', alignItems:'center', gap:8 }}>✂️ Réserver maintenant</Link>
              <Link href="/auth/register?role=coiffeur" style={{ background:'rgba(255,255,255,0.1)', color:'#fff', padding:'15px 24px', borderRadius:14, textDecoration:'none', fontSize:14, fontWeight:600, border:'1px solid rgba(255,255,255,0.2)', backdropFilter:'blur(10px)' }}>Devenir coiffeur →</Link>
            </div>
            <div className="fu4 hero-proof" style={{ display:'flex', alignItems:'center', gap:14 }}>
              <div style={{ display:'flex' }}>
                {['KD','YB','MO','AC'].map((i,idx) => (
                  <div key={i} style={{ width:34, height:34, borderRadius:17, background:`hsl(${idx*60+200},60%,40%)`, border:'2px solid rgba(255,255,255,0.3)', marginLeft:idx>0?-10:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, color:'#fff' }}>{i}</div>
                ))}
              </div>
              <div>
                <div style={{ display:'flex', gap:2 }}>{[...Array(5)].map((_,i) => <span key={i} style={{ color:'#FFD700', fontSize:13 }}>★</span>)}</div>
                <div style={{ color:'rgba(255,255,255,0.6)', fontSize:12 }}>+50 000 clients satisfaits</div>
              </div>
            </div>
          </div>

          {/* CARDS — behind on mobile, side on desktop */}
          <div className="hero-cards-col">
            <div style={{ position:'relative', height:480, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <div style={{ background:'rgba(255,255,255,0.08)', backdropFilter:'blur(20px)', border:'1px solid rgba(255,255,255,0.15)', borderRadius:24, padding:22, width:270, position:'absolute', zIndex:3 }}>
                <div style={{ display:'flex', gap:12, alignItems:'center', marginBottom:14 }}>
                  <div style={{ width:46, height:46, borderRadius:23, background:'linear-gradient(135deg,#1a2744,#3B5BDB)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>✂️</div>
                  <div>
                    <div style={{ color:'#fff', fontWeight:700, fontSize:14 }}>Karim Diallo</div>
                    <div style={{ color:'rgba(255,255,255,0.6)', fontSize:12 }}>Fade & Design</div>
                  </div>
                  <div style={{ marginLeft:'auto', color:'#FFD700', fontSize:16, fontWeight:800 }}>€25</div>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', padding:'10px 0', borderTop:'1px solid rgba(255,255,255,0.1)', borderBottom:'1px solid rgba(255,255,255,0.1)', marginBottom:12 }}>
                  {[['4.9','Note'],['312','Avis'],['●Dispo','Statut']].map(([v,l]) => (
                    <div key={l} style={{ textAlign:'center' }}>
                      <div style={{ color:v.includes('Dispo')?'#4ade80':'#fff', fontWeight:700, fontSize:13 }}>{v}</div>
                      <div style={{ color:'rgba(255,255,255,0.5)', fontSize:10 }}>{l}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background:'linear-gradient(135deg,#3B5BDB,#7B9EFF)', borderRadius:10, padding:'11px', textAlign:'center', color:'#fff', fontWeight:700, fontSize:13 }}>📅 Réserver</div>
              </div>
              <div className="float" style={{ background:'rgba(255,255,255,0.06)', backdropFilter:'blur(15px)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:16, padding:16, width:190, position:'absolute', top:30, right:-10, zIndex:2 }}>
                <div style={{ fontSize:22, marginBottom:8 }}>💈</div>
                <div style={{ color:'#fff', fontWeight:600, fontSize:13 }}>Youssef B.</div>
                <div style={{ color:'rgba(255,255,255,0.5)', fontSize:11 }}>Barbe & Rasage</div>
                <div style={{ color:'#FFD700', fontSize:11, marginTop:5 }}>★★★★★ 4.8</div>
              </div>
              <div className="float2" style={{ background:'rgba(255,255,255,0.06)', backdropFilter:'blur(15px)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:16, padding:16, width:180, position:'absolute', bottom:50, left:-10, zIndex:2 }}>
                <div style={{ fontSize:22, marginBottom:8 }}>🪒</div>
                <div style={{ color:'#fff', fontWeight:600, fontSize:13 }}>Marcus O.</div>
                <div style={{ color:'rgba(255,255,255,0.5)', fontSize:11 }}>Afro & Locks</div>
                <div style={{ color:'#FFD700', fontSize:11, marginTop:5 }}>★★★★★ 4.7</div>
              </div>
              <div className="hero-notif" style={{ position:'absolute', top:0, left:-30, background:'#fff', borderRadius:14, padding:'10px 14px', boxShadow:'0 8px 30px rgba(0,0,0,0.2)', zIndex:4, display:'flex', alignItems:'center', gap:10, animation:'slideIn 0.5s ease 1s both' }}>
                <div style={{ width:10, height:10, borderRadius:5, background:'#4ade80', animation:'pulse 2s infinite' }} />
                <div>
                  <div style={{ fontSize:12, fontWeight:700, color:'#0A0F2C' }}>Réservation confirmée ✓</div>
                  <div style={{ fontSize:11, color:'#666' }}>Il y a 2 min · Paris 8e</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section ref={statsRef} style={{ background:'#fff', borderBottom:'1px solid #eef0f8' }}>
        <div className="stats-grid" style={{ maxWidth:900, margin:'0 auto', padding:'80px 40px', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:40, textAlign:'center' }}>
          {[
            { val:coiffeurs, suffix:'+', label:'Coiffeurs certifiés', icon:'✂️' },
            { val:clients, suffix:'+', label:'Clients satisfaits', icon:'👤' },
            { val:(rating/10).toFixed(1), suffix:'★', label:'Note moyenne', icon:'⭐' },
            { val:cities, suffix:' villes', label:'Villes couvertes', icon:'📍' },
          ].map((s,i) => (
            <div key={i}>
              <div style={{ fontSize:32, marginBottom:8 }}>{s.icon}</div>
              <div style={{ fontFamily:'Syne,sans-serif', fontSize:42, fontWeight:800, color:'#0A0F2C', lineHeight:1 }}>{s.val}{s.suffix}</div>
              <div style={{ color:'#8892B0', fontSize:14, marginTop:6 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* COIFFEURS */}
      <section className="coiffeurs-section" style={{ padding:'100px 40px', background:'#F8F9FF' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:48 }}>
            <div style={{ display:'inline-block', background:'#EEF0FF', color:'#3B5BDB', fontSize:12, fontWeight:700, padding:'6px 16px', borderRadius:20, marginBottom:14 }}>✂️ NOS COIFFEURS</div>
            <h2 className="section-title" style={{ fontFamily:'Syne,sans-serif', fontSize:38, fontWeight:800, color:'#0A0F2C', marginBottom:14 }}>Les meilleurs coiffeurs<br />près de chez vous</h2>
            <p style={{ color:'#8892B0', fontSize:16, maxWidth:460, margin:'0 auto' }}>Chaque coiffeur est vérifié, noté et assuré.</p>
          </div>
          <div className="coiffeurs-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:18 }}>
            {COIFFEURS.map((b,i) => (
              <div key={i} className="card-hover" style={{ borderRadius:20, overflow:'hidden', background:'#fff', border:'1px solid #eef0f8', boxShadow:'0 2px 12px rgba(10,15,44,0.06)' }}>
                <div style={{ background:b.bg, padding:'24px 20px 18px', position:'relative' }}>
                  <div style={{ fontSize:42, marginBottom:10 }}>{b.emoji}</div>
                  {b.avail && (
                    <div style={{ position:'absolute', top:12, right:12, background:'rgba(74,222,128,0.2)', border:'1px solid rgba(74,222,128,0.4)', borderRadius:20, padding:'3px 8px', display:'flex', alignItems:'center', gap:4 }}>
                      <span style={{ width:5, height:5, borderRadius:3, background:'#4ade80', display:'inline-block' }} />
                      <span style={{ color:'#4ade80', fontSize:10, fontWeight:700 }}>Dispo</span>
                    </div>
                  )}
                  <div style={{ color:'#fff', fontWeight:800, fontSize:16, fontFamily:'Syne,sans-serif' }}>{b.name}</div>
                  <div style={{ color:'rgba(255,255,255,0.6)', fontSize:12, marginTop:2 }}>{b.spec}</div>
                </div>
                <div style={{ padding:'14px 16px' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
                    <div style={{ display:'flex', gap:2 }}>{[...Array(5)].map((_,i) => <span key={i} style={{ color:'#FFD700', fontSize:11 }}>★</span>)}<span style={{ color:'#8892B0', fontSize:11, marginLeft:4 }}>{b.rating}</span></div>
                    <div style={{ fontSize:16, fontWeight:800, color:'#0A0F2C' }}>€{b.price}</div>
                  </div>
                  <div style={{ color:'#8892B0', fontSize:12, marginBottom:12 }}>📍 {b.city}</div>
                  <Link href="/auth/register" style={{ display:'block', background:'#0A0F2C', color:'#fff', textAlign:'center', padding:'10px', borderRadius:10, textDecoration:'none', fontSize:13, fontWeight:700 }}>Réserver</Link>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign:'center', marginTop:36 }}>
            <Link href="/explore" style={{ display:'inline-flex', alignItems:'center', gap:8, color:'#3B5BDB', textDecoration:'none', fontSize:14, fontWeight:700, border:'1px solid #3B5BDB', padding:'12px 28px', borderRadius:12 }}>Voir tous les coiffeurs →</Link>
          </div>
        </div>
      </section>

      {/* HOW */}
      <section className="how-section" style={{ padding:'100px 40px', background:'#0A0F2C' }}>
        <div style={{ maxWidth:1000, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:50 }}>
            <div style={{ display:'inline-block', background:'rgba(123,158,255,0.15)', color:'#7B9EFF', fontSize:12, fontWeight:700, padding:'6px 16px', borderRadius:20, marginBottom:14 }}>COMMENT ÇA MARCHE</div>
            <h2 className="section-title" style={{ fontFamily:'Syne,sans-serif', fontSize:38, fontWeight:800, color:'#fff' }}>Simple comme un Uber</h2>
          </div>
          <div className="how-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20 }}>
            {[
              { n:'01', e:'📍', t:'Localisez', d:"Entrez votre adresse. On trouve les coiffeurs disponibles près de vous." },
              { n:'02', e:'✂️', t:'Choisissez', d:'Comparez les profils, avis et tarifs.' },
              { n:'03', e:'📅', t:'Réservez', d:'Sélectionnez votre créneau et payez en ligne.' },
              { n:'04', e:'🚗', t:'Profitez', d:'Votre coiffeur arrive chez vous. Suivez-le en temps réel.' },
            ].map(s => (
              <div key={s.n} style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:18, padding:24 }}>
                <div style={{ color:'#3B5BDB', fontSize:11, fontWeight:800, letterSpacing:2, marginBottom:16 }}>{s.n}</div>
                <div style={{ fontSize:32, marginBottom:12 }}>{s.e}</div>
                <div style={{ fontFamily:'Syne,sans-serif', fontSize:18, fontWeight:700, color:'#fff', marginBottom:8 }}>{s.t}</div>
                <div style={{ color:'rgba(255,255,255,0.5)', fontSize:13, lineHeight:1.6 }}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" style={{ padding:'100px 40px', background:'#F8F9FF' }}>
        <div style={{ maxWidth:760, margin:'0 auto', background:'linear-gradient(135deg,#0A0F2C 0%,#1a2560 100%)', borderRadius:28, overflow:'hidden', position:'relative' }}>
          <div style={{ position:'absolute', top:-30, right:-30, fontSize:160, opacity:0.04 }}>✂️</div>
          <div className="cta-box" style={{ padding:'64px 56px', textAlign:'center' }}>
            <div style={{ display:'inline-block', background:'rgba(123,158,255,0.15)', color:'#7B9EFF', fontSize:12, fontWeight:700, padding:'6px 16px', borderRadius:20, marginBottom:20 }}>COIFFEURS</div>
            <h2 className="cta-title section-title" style={{ fontFamily:'Syne,sans-serif', fontSize:36, fontWeight:800, color:'#fff', marginBottom:18 }}>Développez votre clientèle</h2>
            <p style={{ color:'rgba(255,255,255,0.6)', fontSize:16, lineHeight:1.7, marginBottom:32, maxWidth:440, margin:'0 auto 32px' }}>
              Rejoignez +500 coiffeurs sur E-Barber. Gérez vos horaires, prestations et revenus.
            </p>
            <Link href="/auth/register?role=coiffeur" className="btn-p" style={{ display:'inline-flex', alignItems:'center', gap:10, background:'#fff', color:'#0A0F2C', padding:'15px 32px', borderRadius:14, textDecoration:'none', fontSize:15, fontWeight:800 }}>
              ✂️ Créer mon profil coiffeur →
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background:'#0A0F2C', padding:'44px 40px', borderTop:'1px solid rgba(255,255,255,0.06)' }}>
        <div className="footer-inner" style={{ maxWidth:1100, margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:20 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ fontSize:18 }}>💈</span>
            <span style={{ fontFamily:'Syne,sans-serif', fontSize:18, fontWeight:800, color:'#fff' }}>E-Barber</span>
          </div>
          <div style={{ color:'rgba(255,255,255,0.3)', fontSize:13 }}>© 2026 E-Barber · Tous droits réservés</div>
          <div style={{ display:'flex', gap:20 }}>
            {['CGU','Confidentialité','Contact'].map(l => (
              <a key={l} href="#" style={{ color:'rgba(255,255,255,0.4)', textDecoration:'none', fontSize:13 }}>{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}

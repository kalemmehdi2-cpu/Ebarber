'use client'
import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

function RegisterForm() {
  const router = useRouter()
  const params = useSearchParams()
  const [role, setRole] = useState<'client' | 'coiffeur'>(params.get('role') === 'coiffeur' ? 'coiffeur' : 'client')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', password: '', specialty: '', bio: '', base_price: '25', city: 'Paris' })
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: { data: { full_name: form.full_name } }
    })

    if (signUpError) { setError(signUpError.message); setLoading(false); return }

    if (data.user) {
      await supabase.from('profiles').upsert({
        id: data.user.id,
        email: form.email,
        full_name: form.full_name,
        role,
        city: form.city,
        specialty: role === 'coiffeur' ? form.specialty : null,
        verified: false,
      })
    }

    setLoading(false)
    if (role === 'coiffeur') router.push('/merci')
    else router.push('/explore')
  }

  const inp = { width: '100%', background: '#141414', border: '1px solid #1f1f1f', borderRadius: 12, padding: '14px 16px', color: '#F2F2F2', fontSize: 15, outline: 'none', fontFamily: 'Inter, sans-serif' }
  const lbl = { fontSize: 12, fontWeight: 700, color: '#777', letterSpacing: 0.8, textTransform: 'uppercase' as const, display: 'block', marginBottom: 8 }

  return (
    <div style={{ minHeight: '100vh', background: '#080808', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 460 }}>
        <Link href="/" style={{ color: '#777', textDecoration: 'none', fontSize: 14, display: 'block', marginBottom: 40 }}>← Retour</Link>
        <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 26, fontWeight: 800, color: '#F2F2F2', marginBottom: 8 }}>E<span style={{ color: '#C9A84C' }}>-</span>Barber</div>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Créer un compte</h1>
        <p style={{ color: '#777', fontSize: 14, marginBottom: 28 }}>Rejoignez la communauté E-Barber</p>
        <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
          {(['client', 'coiffeur'] as const).map(r => (
            <button key={r} type="button" onClick={() => setRole(r)}
              style={{ flex: 1, padding: '12px', borderRadius: 12, border: `1px solid ${role === r ? '#C9A84C' : '#1f1f1f'}`, background: role === r ? '#C9A84C' : 'transparent', color: role === r ? '#000' : '#777', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
              {r === 'client' ? '👤 Client' : '✂️ Coiffeur'}
            </button>
          ))}
        </div>
        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div><label style={lbl}>Nom complet</label><input style={inp} placeholder="Prénom Nom" required value={form.full_name} onChange={e => set('full_name', e.target.value)} /></div>
          <div><label style={lbl}>Email</label><input style={inp} type="email" placeholder="vous@email.com" required value={form.email} onChange={e => set('email', e.target.value)} /></div>
          <div><label style={lbl}>Téléphone</label><input style={inp} placeholder="+33 6 00 00 00 00" value={form.phone} onChange={e => set('phone', e.target.value)} /></div>
          <div><label style={lbl}>Mot de passe</label><input style={inp} type="password" placeholder="8 caractères minimum" required minLength={8} value={form.password} onChange={e => set('password', e.target.value)} /></div>
          {role === 'coiffeur' && <>
            <div style={{ borderTop: '1px solid #1f1f1f', paddingTop: 14 }}>
              <p style={{ color: '#C9A84C', fontSize: 12, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase' }}>Infos coiffeur</p>
            </div>
            <div><label style={lbl}>Spécialité</label><input style={inp} placeholder="ex: Fade & Design, Barbe, Afro..." required value={form.specialty} onChange={e => set('specialty', e.target.value)} /></div>
            <div><label style={lbl}>Ville</label><input style={inp} placeholder="Paris" value={form.city} onChange={e => set('city', e.target.value)} /></div>
            <div><label style={lbl}>Tarif de base (€)</label><input style={inp} type="number" min="10" placeholder="25" value={form.base_price} onChange={e => set('base_price', e.target.value)} /></div>
            <div><label style={lbl}>Présentation</label><textarea style={{ ...inp, minHeight: 100, resize: 'none' } as any} placeholder="Décrivez votre expérience..." value={form.bio} onChange={e => set('bio', e.target.value)} /></div>
          </>}
          {error && <div style={{ background: '#2a0a0a', border: '1px solid #EF4444', borderRadius: 10, padding: '12px 16px', color: '#EF4444', fontSize: 13 }}>{error}</div>}
          <button type="submit" disabled={loading}
            style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C97A)', color: '#000', fontWeight: 800, fontSize: 15, padding: 16, borderRadius: 14, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1, fontFamily: 'Inter, sans-serif', marginTop: 8 }}>
            {loading ? 'Création...' : role === 'coiffeur' ? 'Créer mon profil coiffeur →' : 'Créer mon compte →'}
          </button>
        </form>
        <p style={{ textAlign: 'center', color: '#777', fontSize: 14, marginTop: 24 }}>
          Déjà un compte ?{' '}
          <Link href="/auth/login" style={{ color: '#C9A84C', textDecoration: 'none', fontWeight: 600 }}>Se connecter</Link>
        </p>
      </div>
    </div>
  )
}

export default function RegisterPage() {
  return <Suspense><RegisterForm /></Suspense>
}

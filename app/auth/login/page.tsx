'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError(error.message); setLoading(false); return }
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', data.user.id).single()
    if (profile?.role === 'barber') router.push('/barber/dashboard')
    else if (profile?.role === 'admin') router.push('/admin')
    else router.push('/explore')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#080808', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <Link href="/" style={{ color: '#777', textDecoration: 'none', fontSize: 14, display: 'block', marginBottom: 40 }}>← Retour</Link>
        <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 26, fontWeight: 800, color: '#F2F2F2', marginBottom: 8 }}>E<span style={{ color: '#C9A84C' }}>-</span>Barber</div>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 28, fontWeight: 800, color: '#F2F2F2', marginBottom: 8 }}>Connexion</h1>
        <p style={{ color: '#777', fontSize: 14, marginBottom: 36 }}>Bon retour parmi nous 👋</p>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: '#777', letterSpacing: 0.8, textTransform: 'uppercase' as const, display: 'block', marginBottom: 8 }}>Email</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="vous@email.com"
              style={{ width: '100%', background: '#141414', border: '1px solid #1f1f1f', borderRadius: 12, padding: '14px 16px', color: '#F2F2F2', fontSize: 15, outline: 'none', fontFamily: 'Inter, sans-serif' }} />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: '#777', letterSpacing: 0.8, textTransform: 'uppercase' as const, display: 'block', marginBottom: 8 }}>Mot de passe</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
              style={{ width: '100%', background: '#141414', border: '1px solid #1f1f1f', borderRadius: 12, padding: '14px 16px', color: '#F2F2F2', fontSize: 15, outline: 'none', fontFamily: 'Inter, sans-serif' }} />
          </div>
          {error && <div style={{ background: '#2a0a0a', border: '1px solid #EF4444', borderRadius: 10, padding: '12px 16px', color: '#EF4444', fontSize: 13 }}>{error}</div>}
          <button type="submit" disabled={loading}
            style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C97A)', color: '#000', fontWeight: 800, fontSize: 15, padding: 16, borderRadius: 14, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1, fontFamily: 'Inter, sans-serif', marginTop: 8 }}>
            {loading ? 'Connexion...' : 'Se connecter →'}
          </button>
        </form>
        <p style={{ textAlign: 'center', color: '#777', fontSize: 14, marginTop: 24 }}>
          Pas encore de compte ?{' '}
          <Link href="/auth/register" style={{ color: '#C9A84C', textDecoration: 'none', fontWeight: 600 }}>S'inscrire</Link>
        </p>
      </div>
    </div>
  )
}
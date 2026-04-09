export default function MerciPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#080808', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: 500, textAlign: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: 24 }}>✂️</div>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 32, fontWeight: 800, color: '#F2F2F2', marginBottom: 16 }}>
          Demande reçue !
        </h1>
        <p style={{ color: '#777', fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
          Ton profil est en cours de validation. On revient vers toi sous 24h.<br />
          En attendant, télécharge l'app pour être prêt dès la validation.
        </p>
        <div style={{ background: '#141414', border: '1px solid #1f1f1f', borderRadius: 20, padding: 32, marginBottom: 24 }}>
          <p style={{ color: '#C9A84C', fontWeight: 700, fontSize: 14, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 20 }}>
            📱 Télécharge l'app E-Barber
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <div style={{ background: '#1f1f1f', borderRadius: 12, padding: '12px 24px', color: '#F2F2F2', fontSize: 14, fontWeight: 600 }}>
              🍎 App Store
            </div>
            <div style={{ background: '#1f1f1f', borderRadius: 12, padding: '12px 24px', color: '#F2F2F2', fontSize: 14, fontWeight: 600 }}>
              🤖 Google Play
            </div>
          </div>
        </div>
        <a href="/" style={{ color: '#777', textDecoration: 'none', fontSize: 14 }}>← Retour au site</a>
      </div>
    </div>
  )
}

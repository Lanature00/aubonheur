interface AvisCardProps {
  text: string
  name: string
  source: string
}

function AvisCard({ text, name, source }: AvisCardProps) {
  return (
    <div
      style={{
        border: '1px solid rgba(201,169,110,0.2)',
        padding: '2rem',
        backgroundColor: 'rgba(201,169,110,0.03)',
        transition: 'border-color 0.3s ease',
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(201,169,110,0.5)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(201,169,110,0.2)')}
    >
      <div style={{ fontSize: '1rem', marginBottom: '1rem' }}>⭐⭐⭐⭐⭐</div>
      <p style={{ fontSize: '0.9rem', lineHeight: 1.8, opacity: 0.8, fontStyle: 'italic', marginBottom: '1.5rem' }}>
        {text}
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 500, fontSize: '0.85rem' }}>{name}</span>
        <span style={{ opacity: 0.4, fontSize: '0.8rem' }}>{source}</span>
      </div>
    </div>
  )
}

export default AvisCard
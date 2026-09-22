interface PlatCardProps {
  name: string
  desc: string
  img: string
}

function PlatCard({ name, desc, img }: PlatCardProps) {
  return (
    <div style={{
      backgroundColor: 'var(--dark-2)',
      overflow: 'hidden',
      transition: 'transform 0.3s ease',
    }}
      onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
    >
      <div style={{
        height: '220px',
        backgroundImage: `url(${img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'filter 0.3s ease',
      }} />
      <div style={{ padding: '1.5rem' }}>
        <h3 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '1.8rem',
          color: 'var(--gold)',
          marginBottom: '0.8rem',
        }}>
          {name}
        </h3>
        <p style={{ fontSize: '0.9rem', opacity: 0.7, lineHeight: 1.7 }}>{desc}</p>
      </div>
    </div>
  )
}

export default PlatCard
interface SectionTitleProps {
  tag: string
  title: string
  italic?: string
  center?: boolean
}

function SectionTitle({ tag, title, italic, center = false }: SectionTitleProps) {
  return (
    <div style={{ textAlign: center ? 'center' : 'left', marginBottom: '3rem' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: center ? 'center' : 'flex-start',
        gap: '1rem',
        marginBottom: '1rem',
      }}>
        {center && <div style={{ height: '1px', width: '3rem', backgroundColor: 'var(--gold)' }} />}
        {!center && <div style={{ height: '1px', width: '3rem', backgroundColor: 'var(--gold)' }} />}
        <span style={{ fontSize: '0.7rem', letterSpacing: '0.3em', color: 'var(--gold)' }}>
          {tag}
        </span>
        {center && <div style={{ height: '1px', width: '3rem', backgroundColor: 'var(--gold)' }} />}
      </div>
      <h2 style={{
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
        fontWeight: 300,
        lineHeight: 1.2,
      }}>
        {title}{' '}
        {italic && <em style={{ color: 'var(--gold)' }}>{italic}</em>}
      </h2>
    </div>
  )
}

export default SectionTitle
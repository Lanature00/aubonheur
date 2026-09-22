import { Link } from 'react-router-dom'
import { useWindowSize } from '../hooks/useWindowSize'

function Footer() {
  const { isMobile } = useWindowSize()

  return (
    <footer id="contact" style={{
      backgroundColor: 'var(--dark)',
      borderTop: '1px solid rgba(201,169,110,0.2)',
      padding: isMobile ? '3rem 1.5rem' : '4rem 5rem',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
        gap: isMobile ? '2rem' : '3rem',
        marginBottom: '3rem',
      }}>
        <div>
          <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', color: 'var(--gold)', marginBottom: '1rem', letterSpacing: '0.1em' }}>
            AU BONHEUR
          </h3>
          <p style={{ fontSize: '0.85rem', opacity: 0.6, lineHeight: 1.8 }}>
            L'authenticité des saveurs asiatiques au cœur de Paris.
          </p>
        </div>
        <div>
          <h4 style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--gold)', marginBottom: '1rem' }}>📍 ADRESSE</h4>
          <p style={{ fontSize: '0.85rem', opacity: 0.7, lineHeight: 1.8 }}>11 Rue Cadet<br />75009 Paris</p>
        </div>
        <div>
          <h4 style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--gold)', marginBottom: '1rem' }}>📞 TÉLÉPHONE</h4>
          <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>+33 1 47 70 50 22</p>
        </div>
        <div>
          <h4 style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--gold)', marginBottom: '1rem' }}>🕐 HORAIRES</h4>
          <p style={{ fontSize: '0.85rem', opacity: 0.7, lineHeight: 1.8 }}>Lun — Sam : 12h—15h, 18h30—23h<br />Dimanche : Fermé</p>
        </div>
      </div>
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.1)',
        paddingTop: '2rem',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: isMobile ? 'flex-start' : 'center',
        gap: '1rem',
      }}>
        <p style={{ fontSize: '0.8rem', opacity: 0.4 }}>© 2026 Au Bonheur — Tous droits réservés</p>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <a href="#" style={{ fontSize: '0.8rem', opacity: 0.4, textDecoration: 'none', color: 'inherit' }}>Mentions légales</a>
          <a href="#" style={{ fontSize: '0.8rem', opacity: 0.4, textDecoration: 'none', color: 'inherit' }}>Politique de confidentialité</a>
          <Link to="/admin" style={{ fontSize: '0.8rem', opacity: 0.4, textDecoration: 'none', color: 'inherit' }}>Espace Admin</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
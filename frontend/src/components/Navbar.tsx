
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { isAuthenticated, isAdmin, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      backgroundColor: 'rgba(13, 13, 13, 0.95)',
      borderBottom: '1px solid rgba(201, 169, 110, 0.2)',
      padding: '1.2rem 2.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <Link to="/" style={{
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: '1.4rem',
        letterSpacing: '0.2em',
        color: 'var(--gold)',
        textDecoration: 'none',
        fontWeight: 400,
      }}>
        AU BONHEUR
      </Link>

      <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
        <Link to="/" style={{ color: 'var(--white)', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.15em', opacity: 0.8 }}>ACCUEIL</Link>
        <Link to="/reservations" style={{ color: 'var(--white)', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.15em', opacity: 0.8 }}>RÉSERVATION</Link>
        {isAuthenticated && (
          <Link to="/mes-reservations" style={{ color: 'var(--white)', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.15em', opacity: 0.8 }}>MES RÉSERVATIONS</Link>
        )}
        {isAdmin && (
          <Link to="/admin" style={{ color: 'var(--gold)', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.15em' }}>ADMIN</Link>
        )}
        <a href="#contact" style={{ color: 'var(--white)', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.15em', opacity: 0.8 }}>CONTACT</a>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <span style={{ color: 'var(--gold)', fontSize: '0.8rem' }}>📞 01 47 70 50 22</span>
        {isAuthenticated ? (
          <button onClick={handleLogout} style={{
            background: 'transparent',
            border: '1px solid var(--gold)',
            color: 'var(--gold)',
            padding: '0.5rem 1.2rem',
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            cursor: 'pointer',
          }}>
            DÉCONNEXION
          </button>
        ) : (
          <Link to="/login" style={{
            background: 'transparent',
            border: '1px solid var(--gold)',
            color: 'var(--gold)',
            padding: '0.5rem 1.2rem',
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            textDecoration: 'none',
          }}>
            CONNEXION
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar
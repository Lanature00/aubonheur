import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useWindowSize } from '../hooks/useWindowSize'

function Navbar() {
  const { isAuthenticated, isAdmin, logout } = useAuth()
  const navigate = useNavigate()
  const { isMobile } = useWindowSize()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    setMenuOpen(false)
  }

  const linkStyle = {
    color: 'var(--white)',
    textDecoration: 'none',
    fontSize: '0.8rem',
    letterSpacing: '0.15em',
    opacity: 0.8,
  }

  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 100,
      backgroundColor: 'rgba(13, 13, 13, 0.97)',
      borderBottom: '1px solid rgba(201, 169, 110, 0.2)',
      padding: isMobile ? '1rem 1.5rem' : '1.2rem 2.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>

      {/* LOGO */}
      <Link to="/" onClick={() => setMenuOpen(false)} style={{
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: isMobile ? '1.1rem' : '1.4rem',
        letterSpacing: '0.2em',
        color: 'var(--gold)',
        textDecoration: 'none',
        fontWeight: 400,
      }}>
        AU BONHEUR
      </Link>

      {/* DESKTOP — liens centraux */}
      {!isMobile && (
        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          <Link to="/" style={linkStyle}>ACCUEIL</Link>
          <Link to="/reservations" style={linkStyle}>RÉSERVATION</Link>
          {isAuthenticated && <Link to="/mes-reservations" style={linkStyle}>MES RÉSERVATIONS</Link>}
          {isAdmin && <Link to="/admin" style={{ ...linkStyle, color: 'var(--gold)', opacity: 1 }}>ADMIN</Link>}
          <a href="#contact" style={linkStyle}>CONTACT</a>
        </div>
      )}

      {/* DESKTOP — droite */}
      {!isMobile && (
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
      )}

      {/* MOBILE — bouton hamburger */}
      {isMobile && (
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            padding: '4px',
          }}
        >
          <span style={{
            display: 'block', width: '24px', height: '2px',
            backgroundColor: 'var(--gold)',
            transition: 'all 0.3s',
            transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
          }} />
          <span style={{
            display: 'block', width: '24px', height: '2px',
            backgroundColor: 'var(--gold)',
            transition: 'all 0.3s',
            opacity: menuOpen ? 0 : 1,
          }} />
          <span style={{
            display: 'block', width: '24px', height: '2px',
            backgroundColor: 'var(--gold)',
            transition: 'all 0.3s',
            transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
          }} />
        </button>
      )}

      {/* MOBILE — menu déroulant */}
      {isMobile && menuOpen && (
        <div style={{
          position: 'fixed',
          top: '60px',
          left: 0,
          right: 0,
          backgroundColor: 'rgba(13, 13, 13, 0.98)',
          borderBottom: '1px solid rgba(201, 169, 110, 0.2)',
          padding: '2rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          zIndex: 99,
        }}>
          <Link to="/" onClick={() => setMenuOpen(false)} style={linkStyle}>ACCUEIL</Link>
          <Link to="/reservations" onClick={() => setMenuOpen(false)} style={linkStyle}>RÉSERVATION</Link>
          {isAuthenticated && (
            <Link to="/mes-reservations" onClick={() => setMenuOpen(false)} style={linkStyle}>
              MES RÉSERVATIONS
            </Link>
          )}
          {isAdmin && (
            <Link to="/admin" onClick={() => setMenuOpen(false)} style={{ ...linkStyle, color: 'var(--gold)', opacity: 1 }}>
              ADMIN
            </Link>
          )}
          <a href="#contact" onClick={() => setMenuOpen(false)} style={linkStyle}>CONTACT</a>
          <div style={{ height: '1px', backgroundColor: 'rgba(201,169,110,0.2)' }} />
          <span style={{ color: 'var(--gold)', fontSize: '0.85rem' }}>📞 01 47 70 50 22</span>
          {isAuthenticated ? (
            <button onClick={handleLogout} style={{
              background: 'transparent',
              border: '1px solid var(--gold)',
              color: 'var(--gold)',
              padding: '0.8rem',
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              cursor: 'pointer',
              width: '100%',
            }}>
              DÉCONNEXION
            </button>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)} style={{
              background: 'transparent',
              border: '1px solid var(--gold)',
              color: 'var(--gold)',
              padding: '0.8rem',
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              textDecoration: 'none',
              textAlign: 'center',
              display: 'block',
            }}>
              CONNEXION
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
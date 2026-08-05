import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react'

function Navbar() {
  const { isAuthenticated, isAdmin, logout } = useAuth()
  const navigate = useNavigate()

  const [isMobile, setIsMobile] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()

    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleLogout = () => {
    logout()
    setMenuOpen(false)
    navigate('/')
  }

  const closeMenu = () => setMenuOpen(false)

  const linkStyle = {
    color: 'var(--white)',
    textDecoration: 'none',
    fontSize: '0.8rem',
    letterSpacing: '0.15em',
    opacity: 0.8,
  }

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: 'rgba(13, 13, 13, 0.95)',
        borderBottom: '1px solid rgba(201, 169, 110, 0.2)',
        padding: isMobile ? '1rem 1.5rem' : '1.2rem 2.5rem',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* LOGO */}
        <Link
          to="/"
          onClick={closeMenu}
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: isMobile ? '1.2rem' : '1.4rem',
            letterSpacing: '0.2em',
            color: 'var(--gold)',
            textDecoration: 'none',
            fontWeight: 400,
          }}
        >
          AU BONHEUR
        </Link>

        {/* MENU BURGER */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--gold)',
              fontSize: '1.8rem',
              cursor: 'pointer',
              lineHeight: 1,
            }}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        )}

        {/* NAVIGATION DESKTOP */}
        {!isMobile && (
          <>
            <div
              style={{
                display: 'flex',
                gap: '2.5rem',
                alignItems: 'center',
              }}
            >
              <Link to="/" style={linkStyle}>
                ACCUEIL
              </Link>

              <Link to="/reservations" style={linkStyle}>
                RÉSERVATION
              </Link>

              {isAuthenticated && (
                <Link to="/mes-reservations" style={linkStyle}>
                  MES RÉSERVATIONS
                </Link>
              )}

              {isAdmin && (
                <Link
                  to="/admin"
                  style={{
                    color: 'var(--gold)',
                    textDecoration: 'none',
                    fontSize: '0.8rem',
                    letterSpacing: '0.15em',
                  }}
                >
                  ADMIN
                </Link>
              )}

              <a href="#contact" style={linkStyle}>
                CONTACT
              </a>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
              }}
            >
              <span style={{ color: 'var(--gold)', fontSize: '0.8rem' }}>
                📞 01 47 70 50 22
              </span>

              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--gold)',
                    color: 'var(--gold)',
                    padding: '0.5rem 1.2rem',
                    fontSize: '0.75rem',
                    letterSpacing: '0.1em',
                    cursor: 'pointer',
                  }}
                >
                  DÉCONNEXION
                </button>
              ) : (
                <Link
                  to="/login"
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--gold)',
                    color: 'var(--gold)',
                    padding: '0.5rem 1.2rem',
                    fontSize: '0.75rem',
                    letterSpacing: '0.1em',
                    textDecoration: 'none',
                  }}
                >
                  CONNEXION
                </Link>
              )}
            </div>
          </>
        )}
      </div>

      {/* MENU MOBILE */}
      {isMobile && menuOpen && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.2rem',
            paddingTop: '1.5rem',
            paddingBottom: '1rem',
          }}
        >
          <Link to="/" onClick={closeMenu} style={linkStyle}>
            ACCUEIL
          </Link>

          <Link to="/reservations" onClick={closeMenu} style={linkStyle}>
            RÉSERVATION
          </Link>

          {isAuthenticated && (
            <Link
              to="/mes-reservations"
              onClick={closeMenu}
              style={linkStyle}
            >
              MES RÉSERVATIONS
            </Link>
          )}

          {isAdmin && (
            <Link
              to="/admin"
              onClick={closeMenu}
              style={{
                color: 'var(--gold)',
                textDecoration: 'none',
                fontSize: '0.8rem',
                letterSpacing: '0.15em',
              }}
            >
              ADMIN
            </Link>
          )}

          <a href="#contact" onClick={closeMenu} style={linkStyle}>
            CONTACT
          </a>

          <div
            style={{
              borderTop: '1px solid rgba(201, 169, 110, 0.2)',
              paddingTop: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <span style={{ color: 'var(--gold)', fontSize: '0.85rem' }}>
              📞 01 47 70 50 22
            </span>

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--gold)',
                  color: 'var(--gold)',
                  padding: '0.75rem 1rem',
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                DÉCONNEXION
              </button>
            ) : (
              <Link
                to="/login"
                onClick={closeMenu}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--gold)',
                  color: 'var(--gold)',
                  padding: '0.75rem 1rem',
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                  textDecoration: 'none',
                  textAlign: 'center',
                }}
              >
                CONNEXION
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
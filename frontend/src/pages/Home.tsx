import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useEffect, useState, type CSSProperties } from 'react'

function Home() {
  const { isAuthenticated } = useAuth()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()

    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const styles: Record<string, CSSProperties> = {
    sectionPadding: {
      padding: isMobile ? '4rem 1.5rem' : '8rem 5rem',
    },

    heroTitle: {
      fontFamily: 'Cormorant Garamond, serif',
      fontSize: isMobile ? '3.5rem' : '7rem',
      fontWeight: 300,
      lineHeight: 1,
      marginBottom: '1.5rem',
    },

    sectionTitle: {
      fontFamily: 'Cormorant Garamond, serif',
      fontSize: isMobile ? '2.2rem' : '3.5rem',
      fontWeight: 300,
      lineHeight: 1.2,
    },

    grid2: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: isMobile ? '2rem' : '5rem',
      alignItems: 'center',
    },

    grid3: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
      gap: '2rem',
    },

    footerGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
      gap: '2rem',
      marginBottom: '3rem',
    },

    buttonGroup: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: '1rem',
      width: isMobile ? '100%' : 'auto',
    },

    buttonPrimary: {
      backgroundColor: 'var(--burgundy)',
      color: 'var(--white)',
      padding: '1rem 2rem',
      textDecoration: 'none',
      fontSize: '0.75rem',
      letterSpacing: '0.2em',
      fontWeight: 500,
      textAlign: 'center',
      width: isMobile ? '100%' : 'auto',
    },

    buttonSecondary: {
      border: '1px solid rgba(255,255,255,0.4)',
      color: 'var(--white)',
      padding: '1rem 2rem',
      textDecoration: 'none',
      fontSize: '0.75rem',
      letterSpacing: '0.2em',
      textAlign: 'center',
      width: isMobile ? '100%' : 'auto',
    },
  }

  return (
    <div style={{ backgroundColor: 'var(--dark)', color: 'var(--white)' }}>
      {/* HERO */}
      <section
        style={{
          minHeight: '100vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'url(https://images.unsplash.com/photo-1563245372-f21724e3856d?w=1600&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.35)',
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 10,
            padding: isMobile ? '0 10rem' : '0 20rem',
            width: '100%',
            maxWidth: '1200px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.5rem',
              flexWrap: 'wrap',
            }}
          >
            <div
              style={{
                height: '1px',
                width: '3rem',
                backgroundColor: 'var(--gold)',
              }}
            />

            <span
              style={{
                fontSize: isMobile ? '0.65rem' : '0.75rem',
                letterSpacing: '0.2em',
                color: 'var(--gold)',
              }}
            >
              CUISINE ASIATIQUE AUTHENTIQUE
            </span>
          </div>

          <h1 style={styles.heroTitle}>
            <span style={{ color: 'var(--white)', display: 'block' }}>
              AU
            </span>
            <span style={{ color: 'var(--gold)' }}>BONHEUR</span>
          </h1>

          <p
            style={{
              fontSize: isMobile ? '1rem' : '1.1rem',
              fontWeight: 300,
              opacity: 0.8,
              marginBottom: '2rem',
              maxWidth: '500px',
              lineHeight: 1.7,
            }}
          >
            L'authenticité des saveurs asiatiques au cœur de Paris.
          </p>

          <div style={styles.buttonGroup}>
            <Link
              to={isAuthenticated ? '/reservations' : '/register'}
              style={styles.buttonPrimary}
            >
              RÉSERVER UNE TABLE
            </Link>

            <a href="#menu" style={styles.buttonSecondary}>
              DÉCOUVRIR LE MENU
            </a>
          </div>
        </div>

        {!isMobile && (
          <div
            style={{
              position: 'absolute',
              left: '2rem',
              top: '50%',
              transform: 'translateY(-50%) rotate(-90deg)',
              fontSize: '0.65rem',
              letterSpacing: '0.3em',
              color: 'rgba(255,255,255,0.4)',
              whiteSpace: 'nowrap',
            }}
          >
            RESTAURANT ASIATIQUE • PARIS 9ÈME
          </div>
        )}
      </section>

      {/* HISTOIRE */}
      <section
        style={{
          ...styles.sectionPadding,
          ...styles.grid2,
          backgroundColor: 'var(--dark-2)',
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.5rem',
            }}
          >
            <div
              style={{
                height: '1px',
                width: '3rem',
                backgroundColor: 'var(--gold)',
              }}
            />
            <span
              style={{
                fontSize: '0.7rem',
                letterSpacing: '0.3em',
                color: 'var(--gold)',
              }}
            >
              NOTRE HISTOIRE
            </span>
          </div>

          <h2
            style={{
              ...styles.sectionTitle,
              marginBottom: '2rem',
            }}
          >
            Une cuisine
            <br />
            <em style={{ color: 'var(--gold)' }}>authentique</em>
          </h2>

          <p
            style={{
              lineHeight: 1.9,
              opacity: 0.7,
              marginBottom: '1.5rem',
            }}
          >
            Depuis plus de 20 ans, le restaurant Au Bonheur vous accueille dans
            une atmosphère chaleureuse et authentique.
          </p>
        </div>

        <div
          style={{
            height: isMobile ? '280px' : '450px',
            backgroundImage:
              'url(https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '8px',
          }}
        />
      </section>

      {/* SPÉCIALITÉS */}
      <section
        id="menu"
        style={{
          ...styles.sectionPadding,
          backgroundColor: 'var(--dark)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={styles.sectionTitle}>
            Le meilleur de la cuisine
            <br />
            <em style={{ color: 'var(--gold)' }}>asiatique</em>
          </h2>
        </div>

        <div style={styles.grid3}>
          {[
            {
              name: 'Dim Sum',
              desc: 'Raviolis vapeur, bouchées et feuilletés maison préparés chaque matin.',
              img: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=600&q=80',
            },
            {
              name: 'Nouilles sautées',
              desc: 'Nouilles wok sautées aux légumes, crevettes ou bœuf selon votre envie.',
              img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80',
            },
            {
              name: 'Canard laqué',
              desc: 'Notre spécialité de la maison, cuit lentement pendant 24h selon la tradition.',
              img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
            },
          ].map((plat) => (
            <div
              key={plat.name}
              style={{
                backgroundColor: 'var(--dark-2)',
                overflow: 'hidden',
                borderRadius: '8px',
              }}
            >
              <div
                style={{
                  height: '220px',
                  backgroundImage: `url(${plat.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />

              <div style={{ padding: '1.5rem' }}>
                <h3
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '1.8rem',
                    color: 'var(--gold)',
                    marginBottom: '0.8rem',
                  }}
                >
                  {plat.name}
                </h3>

                <p
                  style={{
                    fontSize: '0.9rem',
                    opacity: 0.7,
                    lineHeight: 1.7,
                  }}
                >
                  {plat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          ...styles.sectionPadding,
          textAlign: 'center',
          backgroundImage:
            'url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.75)',
          }}
        />

        <div style={{ position: 'relative', zIndex: 10 }}>
          <h2
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: isMobile ? '2.5rem' : '4rem',
              fontWeight: 300,
              marginBottom: '1.5rem',
              lineHeight: 1.2,
            }}
          >
            Réservez votre
            <br />
            <em style={{ color: 'var(--gold)' }}>expérience</em>
          </h2>

          <p style={{ opacity: 0.7, marginBottom: '2rem' }}>
            Réservez votre table en ligne en quelques clics
          </p>

          <Link
            to={isAuthenticated ? '/reservations' : '/register'}
            style={{
              ...styles.buttonPrimary,
              display: 'inline-block',
            }}
          >
            RÉSERVER UNE TABLE
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          backgroundColor: 'var(--dark)',
          borderTop: '1px solid rgba(201,169,110,0.2)',
          padding: isMobile ? '3rem 1.5rem' : '4rem 5rem',
        }}
      >
        <div style={styles.footerGrid}>
          <div>
            <h3
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '1.5rem',
                color: 'var(--gold)',
                marginBottom: '1rem',
              }}
            >
              AU BONHEUR
            </h3>

            <p
              style={{
                fontSize: '0.85rem',
                opacity: 0.6,
                lineHeight: 1.8,
              }}
            >
              L'authenticité des saveurs asiatiques au cœur de Paris.
            </p>
          </div>

          <div>
            <h4
              style={{
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                color: 'var(--gold)',
                marginBottom: '1rem',
              }}
            >
              📍 ADRESSE
            </h4>

            <p
              style={{
                fontSize: '0.85rem',
                opacity: 0.7,
                lineHeight: 1.8,
              }}
            >
              11 Rue Cadet
              <br />
              75009 Paris
            </p>
          </div>

          <div>
            <h4
              style={{
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                color: 'var(--gold)',
                marginBottom: '1rem',
              }}
            >
              📞 TÉLÉPHONE
            </h4>

            <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>
              +33 1 47 70 50 22
            </p>
          </div>

          <div>
            <h4
              style={{
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                color: 'var(--gold)',
                marginBottom: '1rem',
              }}
            >
              🕐 HORAIRES
            </h4>

            <p
              style={{
                fontSize: '0.85rem',
                opacity: 0.7,
                lineHeight: 1.8,
              }}
            >
              Lun — Sam : 12h—15h, 18h30—23h
              <br />
              Dimanche : Fermé
            </p>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: '2rem',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'flex-start' : 'center',
            gap: '1rem',
          }}
        >
          <p style={{ fontSize: '0.8rem', opacity: 0.4 }}>
            © 2026 Au Bonheur — Tous droits réservés
          </p>

          <div
            style={{
              display: 'flex',
              gap: '1.5rem',
              flexWrap: 'wrap',
            }}
          >
            <a
              href="#"
              style={{
                fontSize: '0.8rem',
                opacity: 0.4,
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              Mentions légales
            </a>

            <a
              href="#"
              style={{
                fontSize: '0.8rem',
                opacity: 0.4,
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              Politique de confidentialité
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home


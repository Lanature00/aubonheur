import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useWindowSize } from '../hooks/useWindowSize'
import SectionTitle from '../components/SectionTitle'
import PlatCard from '../components/PlatCard'
import AvisCard from '../components/AvisCard'
import Footer from '../components/Footer'

const PLATS = [
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
]

const AVIS = [
  { text: '"Un des meilleurs restaurants asiatiques du quartier. Les raviolis vapeur sont divins et le service est impeccable."', name: 'Marie L.', source: 'Google' },
  { text: '"Portions généreuses et produits frais. Le Bo Bun bœuf est une merveille, je recommande vivement !"', name: 'Thomas D.', source: 'TripAdvisor' },
  { text: '"Excellent rapport qualité-prix. Le canard laqué est succulent et l\'ambiance très agréable."', name: 'Sophie M.', source: 'Google' },
  { text: '"Notre cantine asiatique préférée dans le 9ème ! Toujours frais, toujours bon, et le personnel est adorable."', name: 'Pierre B.', source: 'Google' },
]

function Home() {
  const { isAuthenticated } = useAuth()
  const { isMobile, isTablet } = useWindowSize()

  const reservationLink = isAuthenticated ? '/reservations' : '/register'
  const sectionPad = isMobile ? '4rem 1.5rem' : isTablet ? '5rem 3rem' : '8rem 5rem'

  return (
    <div style={{ backgroundColor: 'var(--dark)', color: 'var(--white)' }}>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1563245372-f21724e3856d?w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.35)',
        }} />

        <div style={{
          position: 'relative',
          zIndex: 10,
          padding: isMobile
          ? '0 1.5rem'
          : isTablet
          ? '0 3rem'
          : '0 5rem 0 15%',
          width: '100%',
          boxSizing: 'border-box',
          }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
          }}>
            <div style={{ height: '1px', width: '2rem', backgroundColor: 'var(--gold)', flexShrink: 0 }} />
            <span style={{
              fontSize: isMobile ? '0.6rem' : '0.75rem',
              letterSpacing: '0.2em',
              color: 'var(--gold)',
            }}>
              CUISINE ASIATIQUE AUTHENTIQUE
            </span>
          </div>

          <h1 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: isMobile ? 'clamp(2.5rem, 12vw, 4rem)' : isTablet ? '5rem' : '7rem',
            fontWeight: 300,
            lineHeight: 1,
            marginBottom: '1.5rem',
          }}>
            <span style={{ color: 'var(--white)', display: 'block' }}>AU</span>
            <span style={{ color: 'var(--gold)' }}>BONHEUR</span>
          </h1>

          <p style={{
            fontSize: isMobile ? '0.95rem' : '1.1rem',
            fontWeight: 300,
            opacity: 0.8,
            marginBottom: '2.5rem',
            maxWidth: '500px',
            lineHeight: 1.7,
          }}>
            L'authenticité des saveurs asiatiques au cœur de Paris.
          </p>

          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: '1rem',
            width: isMobile ? '100%' : 'auto',
          }}>
            <Link to={reservationLink} style={{
              backgroundColor: 'var(--burgundy)',
              color: 'var(--white)',
              padding: isMobile ? '1rem' : '1rem 2rem',
              textDecoration: 'none',
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              fontWeight: 500,
              textAlign: 'center',
              display: 'block',
            }}>
              RÉSERVER UNE TABLE
            </Link>
            <a href="#menu" style={{
              border: '1px solid rgba(255,255,255,0.4)',
              color: 'var(--white)',
              padding: isMobile ? '1rem' : '1rem 2rem',
              textDecoration: 'none',
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textAlign: 'center',
              display: 'block',
            }}>
              DÉCOUVRIR LE MENU
            </a>
          </div>
        </div>

        {!isMobile && (
          <div style={{
            position: 'absolute',
            left: '1.5rem',
            top: '50%',
            transform: 'translateY(-50%) rotate(-90deg)',
            fontSize: '0.65rem',
            letterSpacing: '0.3em',
            color: 'rgba(255,255,255,0.4)',
            whiteSpace: 'nowrap',
          }}>
            RESTAURANT ASIATIQUE • PARIS 9ÈME
          </div>
        )}
      </section>

      {/* ── HISTOIRE ─────────────────────────────────────────── */}
      <section style={{
        padding: sectionPad,
        display: 'grid',
        gridTemplateColumns: isMobile || isTablet ? '1fr' : '1fr 1fr',
        gap: isMobile ? '2rem' : '5rem',
        alignItems: 'center',
        backgroundColor: 'var(--dark-2)',
      }}>
        <div>
          <SectionTitle tag="NOTRE HISTOIRE" title="Une cuisine" italic="authentique" />
          <p style={{ lineHeight: 1.9, opacity: 0.7, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            Depuis plus de 20 ans, le restaurant Au Bonheur vous accueille dans une atmosphère chaleureuse et authentique. Nos chefs cuisinent chaque jour des plats traditionnels chinois avec des produits frais et de qualité.
          </p>
          <p style={{ lineHeight: 1.9, opacity: 0.7, fontSize: '0.95rem' }}>
            Venez découvrir les saveurs de la Chine au cœur du 9ème arrondissement de Paris, dans un cadre élégant et chaleureux.
          </p>
        </div>
        <div style={{
          height: isMobile ? '250px' : '450px',
          backgroundImage: 'url(https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />
      </section>

      {/* ── SPÉCIALITÉS ──────────────────────────────────────── */}
      <section id="menu" style={{ padding: sectionPad, backgroundColor: 'var(--dark)' }}>
        <SectionTitle tag="NOS SPÉCIALITÉS" title="Le meilleur de la cuisine" italic="asiatique" center />
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
          gap: '2rem',
        }}>
          {PLATS.map(plat => <PlatCard key={plat.name} {...plat} />)}
        </div>
      </section>

      {/* ── TÉMOIGNAGES ──────────────────────────────────────── */}
      <section style={{ padding: sectionPad, backgroundColor: 'var(--dark-2)' }}>
        <SectionTitle tag="TÉMOIGNAGES" title="Ce qu'ils en" italic="disent" center />
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-block', border: '1px solid rgba(201,169,110,0.3)', padding: '1.5rem 2.5rem' }}>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '3rem', color: 'var(--gold)' }}>4.8</div>
            <div style={{ fontSize: '1.2rem', marginBottom: '0.3rem' }}>⭐⭐⭐⭐⭐</div>
            <div style={{ fontSize: '0.75rem', opacity: 0.6, letterSpacing: '0.1em' }}>Basé sur +200 avis</div>
          </div>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '1.5rem',
          maxWidth: '900px',
          margin: '0 auto',
        }}>
          {AVIS.map(avis => <AvisCard key={avis.name} {...avis} />)}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section style={{
        padding: sectionPad,
        textAlign: 'center',
        backgroundImage: 'url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.75)' }} />
        <div style={{ position: 'relative', zIndex: 10 }}>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: isMobile ? '2.5rem' : '4rem',
            fontWeight: 300,
            marginBottom: '1.5rem',
            lineHeight: 1.2,
          }}>
            Réservez votre<br /><em style={{ color: 'var(--gold)' }}>expérience</em>
          </h2>
          <p style={{ opacity: 0.7, marginBottom: '2.5rem' }}>
            Réservez votre table en ligne en quelques clics
          </p>
          <Link to={reservationLink} style={{
            backgroundColor: 'var(--burgundy)',
            color: 'var(--white)',
            padding: isMobile ? '1rem 2rem' : '1.2rem 3rem',
            textDecoration: 'none',
            fontSize: '0.8rem',
            letterSpacing: '0.2em',
            display: 'inline-block',
          }}>
            RÉSERVER UNE TABLE
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home
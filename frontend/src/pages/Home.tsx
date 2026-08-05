import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Home() {
  const { isAuthenticated } = useAuth()

  return (
    <div style={{ backgroundColor: 'var(--dark)', color: 'var(--white)' }}>

      {/* HERO */}
      <section style={{
        height: '100vh',
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

        <div style={{ position: 'relative', zIndex: 10, padding: '0 5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ height: '1px', width: '3rem', backgroundColor: 'var(--gold)' }} />
            <span style={{ fontSize: '0.75rem', letterSpacing: '0.3em', color: 'var(--gold)' }}>CUISINE ASIATIQUE AUTHENTIQUE</span>
          </div>

          <h1 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '7rem',
            fontWeight: 300,
            lineHeight: 1,
            marginBottom: '1.5rem',
          }}>
            <span style={{ color: 'var(--white)', display: 'block' }}>AU</span>
            <span style={{ color: 'var(--gold)' }}>BONHEUR</span>
          </h1>

          <p style={{ fontSize: '1.1rem', fontWeight: 300, opacity: 0.8, marginBottom: '3rem', maxWidth: '500px' }}>
            L'authenticité des saveurs asiatiques au cœur de Paris.
          </p>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link to={isAuthenticated ? '/reservations' : '/register'} style={{
              backgroundColor: 'var(--burgundy)',
              color: 'var(--white)',
              padding: '1rem 2rem',
              textDecoration: 'none',
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              fontWeight: 500,
            }}>
              RÉSERVER UNE TABLE
            </Link>
            <a href="#menu" style={{
              border: '1px solid rgba(255,255,255,0.4)',
              color: 'var(--white)',
              padding: '1rem 2rem',
              textDecoration: 'none',
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
            }}>
              DÉCOUVRIR LE MENU
            </a>
          </div>
        </div>

        <div style={{
          position: 'absolute',
          left: '2rem',
          top: '50%',
          transform: 'translateY(-50%) rotate(-90deg)',
          fontSize: '0.65rem',
          letterSpacing: '0.3em',
          color: 'rgba(255,255,255,0.4)',
          whiteSpace: 'nowrap',
        }}>
          RESTAURANT ASIATIQUE • PARIS 9ÈME
        </div>
      </section>

      {/* HISTOIRE */}
      <section style={{
        padding: '8rem 5rem',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '5rem',
        alignItems: 'center',
        backgroundColor: 'var(--dark-2)',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ height: '1px', width: '3rem', backgroundColor: 'var(--gold)' }} />
            <span style={{ fontSize: '0.7rem', letterSpacing: '0.3em', color: 'var(--gold)' }}>NOTRE HISTOIRE</span>
          </div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '3.5rem', fontWeight: 300, marginBottom: '2rem', lineHeight: 1.2 }}>
            Une cuisine<br /><em style={{ color: 'var(--gold)' }}>authentique</em>
          </h2>
          <p style={{ lineHeight: 1.9, opacity: 0.7, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            Depuis plus de 20 ans, le restaurant Au Bonheur vous accueille dans une atmosphère chaleureuse et authentique. Nos chefs cuisinent chaque jour des plats traditionnels chinois avec des produits frais et de qualité.
          </p>
          <p style={{ lineHeight: 1.9, opacity: 0.7, fontSize: '0.95rem' }}>
            Venez découvrir les saveurs de la Chine au cœur du 9ème arrondissement de Paris, dans un cadre élégant et chaleureux.
          </p>
        </div>
        <div style={{
          height: '450px',
          backgroundImage: 'url(https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />
      </section>

      {/* SPÉCIALITÉS */}
      <section id="menu" style={{ padding: '8rem 5rem', backgroundColor: 'var(--dark)' }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ height: '1px', width: '3rem', backgroundColor: 'var(--gold)' }} />
            <span style={{ fontSize: '0.7rem', letterSpacing: '0.3em', color: 'var(--gold)' }}>NOS SPÉCIALITÉS</span>
            <div style={{ height: '1px', width: '3rem', backgroundColor: 'var(--gold)' }} />
          </div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '3.5rem', fontWeight: 300 }}>
            Le meilleur de la cuisine<br /><em style={{ color: 'var(--gold)' }}>asiatique</em>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          {[
            {
              emoji: '🥟',
              name: 'Dim Sum',
              desc: 'Raviolis vapeur, bouchées et feuilletés maison préparés chaque matin.',
              img: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=600&q=80'
            },
            {
              emoji: '🍜',
              name: 'Nouilles sautées',
              desc: 'Nouilles wok sautées aux légumes, crevettes ou bœuf selon votre envie.',
              img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80'
            },
            {
              emoji: '🦆',
              name: 'Canard laqué',
              desc: 'Notre spécialité de la maison, cuit lentement pendant 24h selon la tradition.',
              img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80'
            }
          ].map((plat) => (
            <div key={plat.name} style={{ backgroundColor: 'var(--dark-2)', overflow: 'hidden' }}>
              <div style={{
                height: '220px',
                backgroundImage: `url(${plat.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'brightness(0.7)',
              }} />
              <div style={{ padding: '2rem' }}>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: 'var(--gold)', marginBottom: '0.8rem' }}>
                  {plat.name}
                </h3>
                <p style={{ fontSize: '0.9rem', opacity: 0.7, lineHeight: 1.7 }}>{plat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TÉMOIGNAGES */}
      <section style={{ padding: '8rem 5rem', backgroundColor: 'var(--dark-2)' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ height: '1px', width: '3rem', backgroundColor: 'var(--gold)' }} />
            <span style={{ fontSize: '0.7rem', letterSpacing: '0.3em', color: 'var(--gold)' }}>TÉMOIGNAGES</span>
            <div style={{ height: '1px', width: '3rem', backgroundColor: 'var(--gold)' }} />
          </div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '3.5rem', fontWeight: 300 }}>
            Ce qu'ils en <em style={{ color: 'var(--gold)' }}>disent</em>
          </h2>
          <div style={{ marginTop: '2rem', display: 'inline-block', border: '1px solid rgba(201,169,110,0.3)', padding: '1.5rem 2.5rem' }}>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '3rem', color: 'var(--gold)' }}>4.8</div>
            <div style={{ fontSize: '1.2rem', marginBottom: '0.3rem' }}>⭐⭐⭐⭐⭐</div>
            <div style={{ fontSize: '0.75rem', opacity: 0.6, letterSpacing: '0.1em' }}>Basé sur +200 avis</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
          {[
            { text: '"Un des meilleurs restaurants asiatiques du quartier. Les raviolis vapeur sont divins et le service est impeccable."', name: 'Marie L.', source: 'Google' },
            { text: '"Portions généreuses et produits frais. Le Bo Bun bœuf est une merveille, je recommande vivement !"', name: 'Thomas D.', source: 'TripAdvisor' },
            { text: '"Excellent rapport qualité-prix. Le canard laqué est succulent et l\'ambiance très agréable."', name: 'Sophie M.', source: 'Google' },
            { text: '"Notre cantine asiatique préférée dans le 9ème ! Toujours frais, toujours bon, et le personnel est adorable."', name: 'Pierre B.', source: 'Google' },
          ].map((avis) => (
            <div key={avis.name} style={{
              border: '1px solid rgba(201,169,110,0.2)',
              padding: '2rem',
              backgroundColor: 'rgba(201,169,110,0.03)',
            }}>
              <div style={{ fontSize: '1rem', marginBottom: '1rem' }}>⭐⭐⭐⭐⭐</div>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.8, opacity: 0.8, fontStyle: 'italic', marginBottom: '1.5rem' }}>{avis.text}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 500, fontSize: '0.85rem' }}>{avis.name}</span>
                <span style={{ opacity: 0.4, fontSize: '0.8rem' }}>{avis.source}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA RÉSERVATION */}
      <section style={{
        padding: '8rem 5rem',
        textAlign: 'center',
        backgroundImage: 'url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.75)' }} />
        <div style={{ position: 'relative', zIndex: 10 }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '4rem', fontWeight: 300, marginBottom: '1.5rem' }}>
            Réservez votre<br /><em style={{ color: 'var(--gold)' }}>expérience</em>
          </h2>
          <p style={{ opacity: 0.7, marginBottom: '3rem', fontSize: '1rem' }}>Réservez votre table en ligne en quelques clics</p>
          <Link to={isAuthenticated ? '/reservations' : '/register'} style={{
            backgroundColor: 'var(--burgundy)',
            color: 'var(--white)',
            padding: '1.2rem 3rem',
            textDecoration: 'none',
            fontSize: '0.8rem',
            letterSpacing: '0.2em',
          }}>
            RÉSERVER UNE TABLE
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" style={{
        backgroundColor: 'var(--dark)',
        borderTop: '1px solid rgba(201,169,110,0.2)',
        padding: '4rem 5rem',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '3rem', marginBottom: '3rem' }}>
          <div>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', color: 'var(--gold)', marginBottom: '1rem', letterSpacing: '0.1em' }}>AU BONHEUR</h3>
            <p style={{ fontSize: '0.85rem', opacity: 0.6, lineHeight: 1.8 }}>L'authenticité des saveurs asiatiques au cœur de Paris.</p>
          </div>
          <div>
            <h4 style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--gold)', marginBottom: '1.2rem' }}>📍 ADRESSE</h4>
            <p style={{ fontSize: '0.85rem', opacity: 0.7, lineHeight: 1.8 }}>11 Rue Cadet<br />75009 Paris</p>
          </div>
          <div>
            <h4 style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--gold)', marginBottom: '1.2rem' }}>📞 TÉLÉPHONE</h4>
            <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>+33 1 47 70 50 22</p>
          </div>
          <div>
            <h4 style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--gold)', marginBottom: '1.2rem' }}>🕐 HORAIRES</h4>
            <p style={{ fontSize: '0.85rem', opacity: 0.7, lineHeight: 1.8 }}>Lun — Sam : 12h—15h, 18h30—23h<br />Dimanche : Fermé</p>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: '0.8rem', opacity: 0.4 }}>© 2026 Au Bonheur — Tous droits réservés</p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <a href="#" style={{ fontSize: '0.8rem', opacity: 0.4, textDecoration: 'none', color: 'inherit' }}>Mentions légales</a>
            <a href="#" style={{ fontSize: '0.8rem', opacity: 0.4, textDecoration: 'none', color: 'inherit' }}>Politique de confidentialité</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
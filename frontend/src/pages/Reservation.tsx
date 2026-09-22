import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { useWindowSize } from '../hooks/useWindowSize'
import Footer from '../components/Footer'

const HEURES = ['12:00', '12:30', '13:00', '13:30', '19:00', '19:30', '20:00', '20:30', '21:00']
const MOIS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
const JOURS = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay()
  return day === 0 ? 6 : day - 1
}

function Reservation() {
  const navigate = useNavigate()
  const { isMobile, isTablet } = useWindowSize()

  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedHeure, setSelectedHeure] = useState<string>('')
  const [nombrePersonnes, setNombrePersonnes] = useState<number>(2)
  const [nomContact, setNomContact] = useState('')
  const [telephone, setTelephone] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [erreur, setErreur] = useState('')
  const [succes, setSucces] = useState(false)
  const [chargement, setChargement] = useState(false)

  const daysInMonth = getDaysInMonth(currentYear, currentMonth)
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth)

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1) }
    else setCurrentMonth(m => m - 1)
  }

  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1) }
    else setCurrentMonth(m => m + 1)
  }

  const selectDay = (day: number) => {
    const d = new Date(currentYear, currentMonth, day)
    if (d.getDay() === 0) return // dimanche fermé
    if (d < new Date(today.getFullYear(), today.getMonth(), today.getDate())) return
    const iso = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    setSelectedDate(iso)
  }

  const isDimanche = (day: number) => new Date(currentYear, currentMonth, day).getDay() === 0
  const isPast = (day: number) => new Date(currentYear, currentMonth, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate())

  const handleSubmit = async () => {
    if (!selectedDate || !selectedHeure || !nomContact || !telephone) {
      setErreur('Veuillez remplir tous les champs obligatoires.')
      return
    }
    setChargement(true)
    setErreur('')
    try {
      await api.post('/reservations', {
        date: selectedDate,
        heure: selectedHeure,
        nombre_personnes: nombrePersonnes,
        nom_contact: nomContact,
        telephone,
      })
      setSucces(true)
      setTimeout(() => navigate('/mes-reservations'), 2500)
    } catch {
      setErreur('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setChargement(false)
    }
  }

  const inputStyle = {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: 'var(--white)',
    padding: '0.8rem 1rem',
    fontSize: '0.9rem',
    outline: 'none',
    fontFamily: 'Inter, sans-serif',
    boxSizing: 'border-box' as const,
  }

  const labelStyle = {
    fontSize: '0.7rem',
    letterSpacing: '0.15em',
    color: 'var(--gold)',
    display: 'block',
    marginBottom: '0.5rem',
  }

  return (
    <div style={{ backgroundColor: 'var(--dark)', color: 'var(--white)', minHeight: '100vh' }}>
      <div style={{ padding: isMobile ? '8rem 1.5rem 4rem' : '10rem 5rem 4rem' }}>

        {/* TITRE */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ height: '1px', width: '3rem', backgroundColor: 'var(--gold)' }} />
            <span style={{ fontSize: '0.7rem', letterSpacing: '0.3em', color: 'var(--gold)' }}>RÉSERVATION EN LIGNE</span>
            <div style={{ height: '1px', width: '3rem', backgroundColor: 'var(--gold)' }} />
          </div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: isMobile ? '2.5rem' : '4rem', fontWeight: 300, marginBottom: '1rem' }}>
            Réservez votre <em style={{ color: 'var(--gold)' }}>table</em>
          </h1>
          <p style={{ opacity: 0.6, fontSize: '0.95rem' }}>Sélectionnez une date, un horaire et complétez vos informations.</p>
        </div>

        {succes && (
          <div style={{ textAlign: 'center', padding: '2rem', border: '1px solid var(--gold)', marginBottom: '2rem', color: 'var(--gold)' }}>
            ✓ Réservation envoyée ! Redirection en cours...
          </div>
        )}

        {erreur && (
          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'rgba(192,57,43,0.2)', marginBottom: '2rem', fontSize: '0.9rem' }}>
            {erreur}
          </div>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile || isTablet ? '1fr' : '1fr 1fr',
          gap: '2rem',
          maxWidth: '1100px',
          margin: '0 auto',
        }}>

          {/* ── COLONNE GAUCHE : CALENDRIER ─────────────────── */}
          <div>
            <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--gold)', marginBottom: '1rem' }}>
              📅 CHOISIR UNE DATE
            </p>
            <div style={{
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '1.5rem',
              backgroundColor: 'rgba(255,255,255,0.02)',
            }}>
              {/* Navigation mois */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <button onClick={prevMonth} style={{ background: 'none', border: 'none', color: 'var(--white)', cursor: 'pointer', fontSize: '1.2rem', opacity: 0.6 }}>‹</button>
                <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem' }}>
                  {MOIS[currentMonth]} {currentYear}
                </span>
                <button onClick={nextMonth} style={{ background: 'none', border: 'none', color: 'var(--white)', cursor: 'pointer', fontSize: '1.2rem', opacity: 0.6 }}>›</button>
              </div>

              {/* En-têtes jours */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '8px' }}>
                {JOURS.map((j, i) => (
                  <div key={i} style={{ textAlign: 'center', fontSize: '0.75rem', opacity: 0.4, padding: '4px' }}>{j}</div>
                ))}
              </div>

              {/* Cases vides + jours */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
                {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1
                  const iso = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                  const isSelected = selectedDate === iso
                  const disabled = isDimanche(day) || isPast(day)
                  return (
                    <button
                      key={day}
                      onClick={() => !disabled && selectDay(day)}
                      style={{
                        padding: '8px 4px',
                        textAlign: 'center',
                        fontSize: '0.85rem',
                        background: isSelected ? 'var(--burgundy)' : 'none',
                        border: isSelected ? '1px solid var(--burgundy)' : '1px solid transparent',
                        color: disabled ? 'rgba(255,255,255,0.2)' : 'var(--white)',
                        cursor: disabled ? 'not-allowed' : 'pointer',
                        fontFamily: 'Inter, sans-serif',
                        transition: 'all 0.2s',
                      }}
                    >
                      {day}
                    </button>
                  )
                })}
              </div>

              <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem', fontSize: '0.75rem', opacity: 0.5 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ width: '12px', height: '12px', backgroundColor: 'var(--burgundy)', display: 'inline-block' }} /> Sélectionné
                </span>
                <span>Dimanche : fermé</span>
              </div>
            </div>

            {/* Heures */}
            {selectedDate && (
              <div style={{ marginTop: '1.5rem' }}>
                <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--gold)', marginBottom: '1rem' }}>
                  🕐 CHOISIR UNE HEURE
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                  {HEURES.map(h => (
                    <button
                      key={h}
                      onClick={() => setSelectedHeure(h)}
                      style={{
                        padding: '0.7rem',
                        fontSize: '0.85rem',
                        background: selectedHeure === h ? 'var(--burgundy)' : 'rgba(255,255,255,0.03)',
                        border: '1px solid',
                        borderColor: selectedHeure === h ? 'var(--burgundy)' : 'rgba(255,255,255,0.1)',
                        color: 'var(--white)',
                        cursor: 'pointer',
                        fontFamily: 'Inter, sans-serif',
                        transition: 'all 0.2s',
                      }}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── COLONNE DROITE : PERSONNES + FORMULAIRE ─────── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Nombre de personnes */}
            <div style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '1.5rem', backgroundColor: 'rgba(255,255,255,0.02)' }}>
              <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--gold)', marginBottom: '1rem' }}>
                👥 Nombre de personnes
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.5rem' }}>
                {Array.from({ length: 12 }).map((_, i) => {
                  const n = i + 1
                  return (
                    <button
                      key={n}
                      onClick={() => setNombrePersonnes(n)}
                      style={{
                        padding: '0.7rem',
                        fontSize: '0.9rem',
                        background: nombrePersonnes === n ? 'var(--burgundy)' : 'rgba(255,255,255,0.03)',
                        border: '1px solid',
                        borderColor: nombrePersonnes === n ? 'var(--burgundy)' : 'rgba(255,255,255,0.1)',
                        color: 'var(--white)',
                        cursor: 'pointer',
                        fontFamily: 'Inter, sans-serif',
                        transition: 'all 0.2s',
                      }}
                    >
                      {n}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Formulaire contact */}
            <div style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '1.5rem', backgroundColor: 'rgba(255,255,255,0.02)' }}>
              <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--gold)', marginBottom: '1.5rem' }}>
                👤 Vos coordonnées
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>NOM COMPLET *</label>
                  <input
                    type="text"
                    placeholder="Votre nom"
                    value={nomContact}
                    onChange={e => setNomContact(e.target.value)}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>📞 TÉLÉPHONE *</label>
                  <input
                    type="tel"
                    placeholder="06 12 34 56 78"
                    value={telephone}
                    onChange={e => setTelephone(e.target.value)}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>✉ EMAIL</label>
                  <input
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>💬 MESSAGE (OPTIONNEL)</label>
                  <textarea
                    placeholder="Allergies, occasion spéciale..."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    rows={3}
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                </div>
              </div>
            </div>

            {/* Bouton soumettre */}
            <button
              onClick={handleSubmit}
              disabled={chargement || succes}
              style={{
                width: '100%',
                backgroundColor: 'var(--burgundy)',
                color: 'var(--white)',
                border: 'none',
                padding: '1.2rem',
                fontSize: '0.8rem',
                letterSpacing: '0.2em',
                cursor: chargement ? 'not-allowed' : 'pointer',
                opacity: chargement ? 0.7 : 1,
                fontFamily: 'Inter, sans-serif',
                transition: 'opacity 0.2s',
              }}
            >
              {chargement ? 'ENVOI EN COURS...' : 'RÉSERVER MA TABLE ✓'}
            </button>

            <p style={{ textAlign: 'center', fontSize: '0.8rem', opacity: 0.4 }}>
              Réservation soumise à confirmation. Nous vous contacterons rapidement.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Reservation
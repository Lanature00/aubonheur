import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'
import type { Reservation } from '../types'

function MesReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [chargement, setChargement] = useState(true)
  const [erreur, setErreur] = useState('')

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await api.get<Reservation[]>('/reservations/mes-reservations')
        setReservations(response.data)
      } catch (err) {
        setErreur('Impossible de charger vos réservations')
      } finally {
        setChargement(false)
      }
    }
    fetchReservations()
  }, [])

  const annuler = async (id: number) => {
    try {
      await api.put(`/reservations/annuler/${id}`)
      setReservations(reservations.map(r =>
        r.id === id ? { ...r, statut: 'annulée' } : r
      ))
    } catch (err) {
      setErreur('Impossible d\'annuler cette réservation')
    }
  }

  const statutCouleur = (statut: string) => {
    if (statut === 'confirmée') return 'bg-green-100 text-green-700'
    if (statut === 'annulée') return 'bg-red-100 text-red-700'
    return 'bg-yellow-100 text-yellow-700'
  }

  if (chargement) return <div className="min-h-screen flex items-center justify-center">Chargement...</div>

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Mes réservations</h1>
          <Link to="/reservations" className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
            Nouvelle réservation
          </Link>
        </div>

        {erreur && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{erreur}</div>
        )}

        {reservations.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
            Aucune réservation pour le moment.
          </div>
        ) : (
          <div className="space-y-4">
            {reservations.map(reservation => (
              <div key={reservation.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-lg">{reservation.nom_contact}</p>
                    <p className="text-gray-600">{new Date(reservation.date).toLocaleDateString('fr-FR')} à {reservation.heure}</p>
                    <p className="text-gray-600">{reservation.nombre_personnes} personne(s)</p>
                    <p className="text-gray-600">{reservation.telephone}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statutCouleur(reservation.statut)}`}>
                      {reservation.statut}
                    </span>
                    {reservation.statut === 'en_attente' && (
                      <button
                        onClick={() => annuler(reservation.id)}
                        className="text-red-600 text-sm hover:underline"
                      >
                        Annuler
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MesReservations
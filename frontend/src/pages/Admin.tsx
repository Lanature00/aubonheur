import { useState, useEffect } from 'react'
import api from '../services/api'
import type { Reservation } from '../types'

function Admin() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [chargement, setChargement] = useState(true)
  const [erreur, setErreur] = useState('')

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await api.get<Reservation[]>('/reservations/admin/toutes')
        setReservations(response.data)
      } catch (err) {
        setErreur('Impossible de charger les réservations')
      } finally {
        setChargement(false)
      }
    }
    fetchReservations()
  }, [])

  const changerStatut = async (id: number, statut: string) => {
    try {
      await api.put(`/reservations/admin/statut/${id}`, { statut })
      setReservations(reservations.map(r =>
        r.id === id ? { ...r, statut: statut as Reservation['statut'] } : r
      ))
    } catch (err) {
      setErreur('Impossible de changer le statut')
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
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Backoffice Admin — Toutes les réservations</h1>

        {erreur && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{erreur}</div>
        )}

        {reservations.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
            Aucune réservation pour le moment.
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3 text-left">Client</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Heure</th>
                  <th className="px-4 py-3 text-left">Personnes</th>
                  <th className="px-4 py-3 text-left">Téléphone</th>
                  <th className="px-4 py-3 text-left">Statut</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {reservations.map(reservation => (
                  <tr key={reservation.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <p className="font-medium">{reservation.nom}</p>
                      <p className="text-gray-500 text-xs">{reservation.email}</p>
                    </td>
                    <td className="px-4 py-3">{new Date(reservation.date).toLocaleDateString('fr-FR')}</td>
                    <td className="px-4 py-3">{reservation.heure}</td>
                    <td className="px-4 py-3">{reservation.nombre_personnes}</td>
                    <td className="px-4 py-3">{reservation.telephone}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statutCouleur(reservation.statut)}`}>
                        {reservation.statut}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={reservation.statut}
                        onChange={(e) => changerStatut(reservation.id, e.target.value)}
                        className="border rounded p-1 text-sm"
                      >
                        <option value="en_attente">En attente</option>
                        <option value="confirmée">Confirmée</option>
                        <option value="annulée">Annulée</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin
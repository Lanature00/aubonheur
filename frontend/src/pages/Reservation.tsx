import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import type { ReservationData } from '../types'

function Reservation() {
  const [formData, setFormData] = useState<ReservationData>({
    date: '',
    heure: '',
    nombre_personnes: 1,
    nom_contact: '',
    telephone: ''
  })
  const [erreur, setErreur] = useState('')
  const [succes, setSucces] = useState(false)
  const [chargement, setChargement] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setChargement(true)
    setErreur('')
    try {
      await api.post('/reservations', formData)
      setSucces(true)
      setTimeout(() => navigate('/mes-reservations'), 2000)
    } catch (err: unknown) {
      setErreur('Une erreur est survenue, veuillez réessayer')
    } finally {
      setChargement(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Réserver une table</h1>
        {succes && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
            Réservation créée avec succès ! Redirection...
          </div>
        )}
        {erreur && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {erreur}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Heure</label>
            <select
              name="heure"
              value={formData.heure}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            >
              <option value="">Choisir une heure</option>
              <option value="12:00">12:00</option>
              <option value="12:30">12:30</option>
              <option value="13:00">13:00</option>
              <option value="13:30">13:30</option>
              <option value="19:00">19:00</option>
              <option value="19:30">19:30</option>
              <option value="20:00">20:00</option>
              <option value="20:30">20:30</option>
              <option value="21:00">21:00</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Nombre de personnes</label>
            <input
              type="number"
              name="nombre_personnes"
              value={formData.nombre_personnes}
              onChange={handleChange}
              min="1"
              max="20"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Nom du contact</label>
            <input
              type="text"
              name="nom_contact"
              value={formData.nom_contact}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Téléphone</label>
            <input
              type="tel"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          </div>
          <button
            type="submit"
            disabled={chargement}
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
          >
            {chargement ? 'Réservation...' : 'Réserver'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Reservation
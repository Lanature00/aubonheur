import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import type { AuthResponse } from '../types'

function Login() {
  const [email, setEmail] = useState('')
  const [motDePasse, setMotDePasse] = useState('')
  const [erreur, setErreur] = useState('')
  const [chargement, setChargement] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setChargement(true)
    setErreur('')

    try {
      const response = await api.post<AuthResponse>('/auth/login', {
        email,
        mot_de_passe: motDePasse
      })
      login(response.data.token, response.data.utilisateur)
      navigate('/')
    } catch (err: unknown) {
      setErreur('Email ou mot de passe incorrect')
    } finally {
      setChargement(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Connexion</h1>

        {erreur && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {erreur}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mot de passe</label>
            <input
              type="password"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={chargement}
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
          >
            {chargement ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Pas encore de compte ?{' '}
          <Link to="/register" className="text-red-600 hover:underline">
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
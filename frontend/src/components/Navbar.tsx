import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { isAuthenticated, isAdmin, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-red-700 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-xl font-bold tracking-wide">
        🍜 Au Bonheur
      </Link>

      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <Link to="/reservations" className="hover:underline text-sm">
              Réserver
            </Link>
            <Link to="/mes-reservations" className="hover:underline text-sm">
              Mes réservations
            </Link>
            {isAdmin && (
              <Link to="/admin" className="hover:underline text-sm font-bold">
                Admin
              </Link>
            )}
            <span className="text-sm text-red-200">Bonjour, {user?.nom}</span>
            <button
              onClick={handleLogout}
              className="bg-white text-red-700 px-3 py-1 rounded text-sm font-medium hover:bg-red-50"
            >
              Déconnexion
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline text-sm">
              Connexion
            </Link>
            <Link to="/register" className="bg-white text-red-700 px-3 py-1 rounded text-sm font-medium hover:bg-red-50">
              S'inscrire
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
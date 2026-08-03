import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Home() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <div className="bg-red-700 text-white py-24 px-4 text-center">
        <h1 className="text-5xl font-bold mb-4">Au Bonheur</h1>
        <p className="text-xl mb-2 text-red-200">Restaurant chinois traditionnel</p>
        <p className="text-red-200 mb-8">Authentique • Savoureux • Chaleureux</p>
        <Link
          to={isAuthenticated ? '/reservations' : '/register'}
          className="bg-white text-red-700 px-8 py-3 rounded-full font-bold text-lg hover:bg-red-50 transition"
        >
          Réserver une table
        </Link>
      </div>

      {/* À propos */}
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Notre histoire</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          Depuis plus de 20 ans, le restaurant Au Bonheur vous accueille dans une atmosphère
          chaleureuse et authentique. Nos chefs cuisinent chaque jour des plats traditionnels
          chinois avec des produits frais et de qualité. Venez découvrir les saveurs de la Chine
          au cœur de votre ville.
        </p>
      </div>

      {/* Menu */}
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Nos spécialités</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="text-4xl mb-4">🥟</div>
              <h3 className="text-xl font-bold mb-2">Dim Sum</h3>
              <p className="text-gray-600">Raviolis vapeur, bouchées et feuilletés maison préparés chaque matin.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="text-4xl mb-4">🍜</div>
              <h3 className="text-xl font-bold mb-2">Nouilles sautées</h3>
              <p className="text-gray-600">Nouilles wok sautées aux légumes, crevettes ou bœuf selon votre envie.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="text-4xl mb-4">🦆</div>
              <h3 className="text-xl font-bold mb-2">Canard laqué</h3>
              <p className="text-gray-600">Notre spécialité de la maison, cuit lentement pendant 24h selon la tradition.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Horaires & Infos */}
      <div className="max-w-4xl mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Horaires</h2>
            <div className="space-y-2 text-gray-600">
              <div className="flex justify-between border-b pb-2">
                <span>Lundi - Vendredi</span>
                <span>12h00 - 14h30 / 19h00 - 22h30</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Samedi</span>
                <span>12h00 - 15h00 / 19h00 - 23h00</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Dimanche</span>
                <span>12h00 - 15h00</span>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6">Nous trouver</h2>
            <div className="space-y-2 text-gray-600">
              <p>📍 123 Rue de la Paix, Paris 75001</p>
              <p>📞 01 23 45 67 89</p>
              <p>✉️ contact@aubonheur.fr</p>
            </div>
            <div className="mt-6">
              <Link
                to={isAuthenticated ? '/reservations' : '/register'}
                className="bg-red-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-800 transition"
              >
                Réserver maintenant
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 text-center py-6 text-sm">
        <p>© 2026 Au Bonheur — Restaurant chinois traditionnel</p>
      </footer>
    </div>
  )
}

export default Home
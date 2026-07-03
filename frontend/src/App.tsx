import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'

function AppContent() {
  const { isAuthenticated, isAdmin } = useAuth()

  return (
    <Routes>
      <Route path="/" element={<div>Page accueil</div>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reservations" element={
        isAuthenticated ? <div>Réservations</div> : <Navigate to="/login" />
      } />
      <Route path="/mes-reservations" element={
        isAuthenticated ? <div>Mes réservations</div> : <Navigate to="/login" />
      } />
      <Route path="/admin" element={
        isAdmin ? <div>Admin</div> : <Navigate to="/" />
      } />
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
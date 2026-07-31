import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Reservation from './pages/Reservation'
import MesReservations from './pages/MesReservations'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <>{children}</>
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { isAdmin } = useAuth()
  if (!isAdmin) return <Navigate to="/" replace />
  return <>{children}</>
}

function AppContent() {
  return (
    <Routes>
      <Route path="/" element={<div>Page accueil</div>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reservations" element={
        <ProtectedRoute><Reservation /></ProtectedRoute>
      } />
      <Route path="/mes-reservations" element={
      <ProtectedRoute><MesReservations /></ProtectedRoute>
      } />
      <Route path="/admin" element={
        <AdminRoute><div>Admin</div></AdminRoute>
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
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import ProtectedRoute from '../components/layout/ProtectedRoute'
import { useAuth } from '../context/useAuth'
import LoginPage from '../features/auth/LoginPage'
import BooksPage from '../features/books/BooksPage'
import CategoriesPage from '../features/categories/CategoriesPage'
import HistoryPage from '../features/history/HistoryPage'
import ActiveLoansPage from '../features/loans/ActiveLoansPage'
import CatalogPage from '../features/loans/CatalogPage'
import ReceiptPage from '../features/receipts/ReceiptPage'
import UsersPage from '../features/users/UsersPage'
import { homePathFor } from '../utils/homePath'

function RootRedirect() {
  const { user } = useAuth()
  return <Navigate to={user ? homePathFor(user.role) : '/login'} replace />
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute role="admin" />}>
        <Route element={<Layout />}>
          <Route path="/admin/categorias" element={<CategoriesPage />} />
          <Route path="/admin/libros" element={<BooksPage />} />
          <Route path="/admin/usuarios" element={<UsersPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute role="user" />}>
        <Route element={<Layout />}>
          <Route path="/catalogo" element={<CatalogPage />} />
          <Route path="/prestamos" element={<ActiveLoansPage />} />
          <Route path="/comprobante/:code" element={<ReceiptPage />} />
          <Route path="/historial" element={<HistoryPage />} />
        </Route>
      </Route>

      <Route path="*" element={<RootRedirect />} />
    </Routes>
  )
}
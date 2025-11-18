import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RentalApp } from './RentalApp'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { AdminProducts } from './pages/AdminProducts'
import { AddProductPage } from './pages/AddProductPage'
import ContextProvider from './Context/Context'
import { ProductDetail } from './pages/ProductDetail'
import { AdminPanel } from './pages/AdminPanel'
import { UserProvider } from './Context/UserContext'
import { AddHighlightPage } from './pages/AddHighlightPage'
import { ProductHighlights } from './pages/ProductHighlights'
import { EditProductPage } from './pages/EditProductPage'
import { AddCategoryPage } from './pages/AddCategoryPage'
import { CategoryPage } from './pages/CategoryPage'
import { EditHighlightPage } from './pages/EditHighlightPage'
import { UserPage } from './pages/UserPage'
import { EditUserPage } from './pages/EditUserPage'
import { AdminLogin } from './pages/AdminLogin'
import { FavoritesPage } from './pages/FavoritesPage'
import { BookingPage } from './pages/BookingPage'
import { BookingConfirmationPage } from './pages/BookingConfirmationPage'
import { BookingHistoryPage } from './pages/BookingHistoryPage'
import { LegalPage } from './pages/LegalPage'
// import { BrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '*',
    element: <RentalApp />
  },
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/administraciónLogin',
    element: <AdminLogin />
  },
  {
    path: '/administración',
    element: <AdminPanel />
  },
  {
    path: '/adminProducts',
    element: <AdminProducts />
  },
  {
    path: '/detail',
    element: <ProductDetail />
  },
  {
    path: '/addProduct',
    element: <AddProductPage />
  },
  {
    path: '/caracteristicas',
    element: <ProductHighlights />
  },
  {
    path: '/addHighlights',
    element: <AddHighlightPage />
  },
  {
    path: '/editHighlight/:id',
    element: <EditHighlightPage />
  },
  {
    path: '/editProduct/:id', // Ruta con parámetro id
    element: <EditProductPage />
  },
  {
    path: '/addCategory',
    element: <AddCategoryPage />
  },
  {
    path: '/categories',
    element: <CategoryPage />
  },
  {
    path: '/users',
    element: <UserPage />
  },
  {
    path: '/editUser/:id', // Ruta con parámetro id
    element: <EditUserPage />
  },
  {
    path: '/favorites',
    element: <FavoritesPage />
  },
  {
    path: '/reservas/:id', // Ruta con parámetro id
    element: <BookingPage />
  },
  {
    path: '/confirmation',
    element: <BookingConfirmationPage />
  },
  {
    path: '/historial',
    element: <BookingHistoryPage />
  },
  {
    path: '/legales',
    element: <LegalPage />
  },

])

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <UserProvider>
      <ContextProvider>
        {/* <RentalApp /> */}
        <RouterProvider router={router} />
      </ContextProvider>
    </UserProvider>
  </StrictMode>,
)

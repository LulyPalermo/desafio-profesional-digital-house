import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { RentalApp } from './RentalApp'
import ContextProvider from './Context/Context'
import { UserProvider } from './Context/UserContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ContextProvider>
          <RentalApp />
        </ContextProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)


// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import { RentalApp } from './RentalApp'
// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import { HomePage } from './pages/HomePage'
// import { AdminProducts } from './pages/AdminProducts'
// import { AddProductPage } from './pages/AddProductPage'
// import ContextProvider from './Context/Context'
// import { ProductDetail } from './pages/ProductDetail'
// import { AdminPanel } from './pages/AdminPanel'
// import { UserProvider } from './Context/UserContext'
// import { AddHighlightPage } from './pages/AddHighlightPage'
// import { ProductHighlights } from './pages/ProductHighlights'
// import { EditProductPage } from './pages/EditProductPage'
// import { AddCategoryPage } from './pages/AddCategoryPage'
// import { CategoryPage } from './pages/CategoryPage'
// import { EditHighlightPage } from './pages/EditHighlightPage'
// import { UserPage } from './pages/UserPage'
// import { EditUserPage } from './pages/EditUserPage'
// import { AdminLogin } from './pages/AdminLogin'
// import { FavoritesPage } from './pages/FavoritesPage'
// import { BookingPage } from './pages/BookingPage'
// import { BookingConfirmationPage } from './pages/BookingConfirmationPage'
// import { BookingHistoryPage } from './pages/BookingHistoryPage'
// import { LegalPage } from './pages/LegalPage'
// import { AdminLayout } from './components/AdminLayout'
// // import { BrowserRouter } from 'react-router-dom'

// const router = createBrowserRouter([
//   {
//     path: '*',
//     element: <RentalApp />
//   },
//   {
//     path: '/',
//     element: <HomePage />
//   },
//   {
//     path: '/administraciónLogin',
//     element: <AdminLogin />
//   },
//   {
//     path: '/detail',
//     element: <ProductDetail />
//   },
//   {
//     path: '/favorites',
//     element: <FavoritesPage />
//   },
//   {
//     path: '/reservas/:id', // Ruta con parámetro id
//     element: <BookingPage />
//   },
//   {
//     path: '/confirmation',
//     element: <BookingConfirmationPage />
//   },
//   {
//     path: '/historial',
//     element: <BookingHistoryPage />
//   },
//   {
//     path: '/legales',
//     element: <LegalPage />
//   },
//   /*  {
//     path: '/administración',
//     element: <AdminPanel />
//   },
//   {
//     path: '/adminProducts',
//     element: <AdminProducts />
//   },
//   {
//     path: '/addProduct',
//     element: <AddProductPage />
//   },
//   {
//     path: '/caracteristicas',
//     element: <ProductHighlights />
//   },
//   {
//     path: '/addHighlights',
//     element: <AddHighlightPage />
//   },
//   {
//     path: '/editHighlight/:id',
//     element: <EditHighlightPage />
//   },
//   {
//     path: '/editProduct/:id', // Ruta con parámetro id
//     element: <EditProductPage />
//   },
//   {
//     path: '/addCategory',
//     element: <AddCategoryPage />
//   },
//   {
//     path: '/categories',
//     element: <CategoryPage />
//   },
//   {
//     path: '/users',
//     element: <UserPage />
//   },
//   {
//     path: '/editUser/:id', // Ruta con parámetro id
//     element: <EditUserPage />
//   }, */
//   {
//     path: '/administración',
//     element: (
//       <AdminLayout>
//         <AdminPanel />
//       </AdminLayout>
//     )
//   },
//   {
//     path: '/adminProducts',
//     element: (
//       <AdminLayout>
//         <AdminProducts />
//       </AdminLayout>
//     )
//   },
//   {
//     path: '/addProduct',
//     element: (
//       <AdminLayout>
//         <AddProductPage />
//       </AdminLayout>
//     )
//   },
//   {
//     path: '/caracteristicas',
//     element: (
//       <AdminLayout>
//         <ProductHighlights />
//       </AdminLayout>
//     )
//   },
//   {
//     path: '/addHighlights',
//     element: (
//       <AdminLayout>
//         <AddHighlightPage />
//       </AdminLayout>
//     )
//   },
//   {
//     path: '/editHighlight/:id',
//     element: (
//       <AdminLayout>
//         <EditHighlightPage />
//       </AdminLayout>
//     )
//   },
//   {
//     path: '/editProduct/:id',
//     element: (
//       <AdminLayout>
//         <EditProductPage />
//       </AdminLayout>
//     )
//   },
//   {
//     path: '/categories',
//     element: (
//       <AdminLayout>
//         <CategoryPage />
//       </AdminLayout>
//     )
//   },
//   {
//     path: '/addCategory',
//     element: (
//       <AdminLayout>
//         <AddCategoryPage />
//       </AdminLayout>
//     )
//   },
//   {
//     path: '/users',
//     element: (
//       <AdminLayout>
//         <UserPage />
//       </AdminLayout>
//     )
//   },
//   {
//     path: '/editUser/:id',
//     element: (
//       <AdminLayout>
//         <EditUserPage />
//       </AdminLayout>
//     )
//   },

// ])

// createRoot(document.getElementById('root')).render(

//   <StrictMode>
//     <UserProvider>
//       <ContextProvider>
//         {/* <RentalApp /> */}
//         <RouterProvider router={router} />
//       </ContextProvider>
//     </UserProvider>
//   </StrictMode>,
// )

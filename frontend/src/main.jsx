import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RentalApp } from './RentalApp'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { AdminProducts } from './pages/AdminProducts'
import { AddProductPage } from './pages/AddProductPage'
import ContextProvider from './Context/Context'
import { ProductDetail } from './pages/ProductDetail'
import { AdminPanel } from './pages/AdminPanel'
// import { BrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
{
  path: '*',
  element: <RentalApp/>
},
{
  path: '/',
  element: <HomePage/>
},
{
  path: '/administración',
  element: <AdminPanel/>
},
{
  path: '/admin',
  element: <AdminProducts/>
},
{
  path: '/detail',
  element: <ProductDetail/>
},
{
  path: '/addProduct',
  element: <AddProductPage/>
},

])

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <ContextProvider>
    {/* <RentalApp /> */}
    <RouterProvider router={router}/>
    </ContextProvider>
  </StrictMode>,
)

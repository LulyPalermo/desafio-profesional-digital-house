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

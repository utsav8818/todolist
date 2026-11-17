import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthContextProvider } from './contextprovider/AuthContext.jsx'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
    <App />
          <ToastContainer position='top-right' autoClose={4000} />

    </AuthContextProvider>
  </StrictMode>,
)


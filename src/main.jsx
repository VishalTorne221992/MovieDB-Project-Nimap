import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { MovieContextProvider } from './Contexts/MovieContext'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MovieContextProvider>
        <App />
    </MovieContextProvider>
  </React.StrictMode>
)

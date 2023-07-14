import React from 'react'
import ReactDOM from 'react-dom/client'
import { RegistroApp } from './RegistroApp.jsx'
import { BrowserRouter } from 'react-router-dom'
import "../src/Assets/styles/styles.css"


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <RegistroApp />
    </BrowserRouter>
  </React.StrictMode>,
)

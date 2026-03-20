import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import 'katex/dist/katex.min.css'
import App from './App.jsx'

import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter basename="/courses">
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)

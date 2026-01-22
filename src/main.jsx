import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Global proider for redux */}
    <Provider store={store}>
    {/* Global router for react router dom  */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Provider>
  </StrictMode>,
)

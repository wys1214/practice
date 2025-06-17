import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
import App from './App.jsx'

//라우터 사용을 위해 import
import {BrowserRouter} from "react-router-dom"

//StricMode => BrowserRouter 변경
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

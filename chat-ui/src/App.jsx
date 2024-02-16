import { useState } from 'react'
import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './components/home/HomePage'
import Login from './components/login/Login'
import Register from './components/register/Register'
import Dashboard from './components/chat/Dashoard'
import Header from './components/home/Header'
import { ProvideAuth } from './components/hooks/useProvideAuth'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{height: '100vh', width: '100vw'}}>
 
      <BrowserRouter>
      <ProvideAuth> 
        <Routes>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<><Header  /><h2>Page under developement</h2></>} />
            <Route path="/contact" element={<><Header  /><h2>Page under developement</h2></>} />
            <Route path='/dashboard/*' element={<Dashboard />} />

            {/* <Route path="/dashboard/*" element={<Dashboard />} /> */}
          </Routes>
          </ProvideAuth>

      </BrowserRouter>
    </div>
  )
}

export default App


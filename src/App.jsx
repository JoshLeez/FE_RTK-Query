import User from './pages/User'
import { useEffect, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route path="/user" element={<User/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </div>
  )
}

export default App

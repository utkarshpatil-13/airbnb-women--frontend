import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import Layout from './Layout'
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'
import UserContext, { UserContextProvider } from './contexts/UserContext'
import AccountPage from './pages/Account'

// import { useContext, useEffect } from 'react'

axios.defaults.baseURL = 'http://localhost:7000'
axios.defaults.withCredentials = true

function App() {

  // const {user, setUser} = useContext(UserContext);
  // const token = localStorage.getItem('token');

  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/account/:subpage?' element={<AccountPage />} />          
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App

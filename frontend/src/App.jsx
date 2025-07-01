import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './Components/Navbar'
import Mainpage from './pages/Mainpage'
import { Routes, Route, useNavigate, Navigate } from 'react-router'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import { useAuthStore } from './assets/authStore'

function App() {
  const {isCheckingAuth, checkAuth, isAuthenticated, user} = useAuthStore();

  useEffect(() => {
    checkAuth();
  },[]);

  console.log(user)
  console.log(isAuthenticated)

  const RedirectIfLogged = ({ children }) => {
    const { isAuthenticated } = useAuthStore();
  
    if (isAuthenticated) {
      return <Navigate to="/" />;
    }
  
    return children;
  };

  return (
    <>
    <div className='bg-[#030712] min-h-screen w-screen font-bold text-white'>
      <Navbar />
        <Routes>
          <Route path='/' element={<Mainpage />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<RedirectIfLogged><Login /></RedirectIfLogged>} />
          <Route path='/register' element={<RedirectIfLogged><Register /></RedirectIfLogged>} />
        </Routes>
    </div>
      
    </>
  )
}

export default App

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './Components/Navbar'
import Mainpage from './pages/Mainpage'
import { Routes, Route } from 'react-router'
import About from './pages/About'

function App() {

  return (
    <>
    <div className='bg-[#030712] min-h-screen w-screen font-bold text-white'>
      <Navbar />
        <Routes>
          <Route path='/' element={<Mainpage />} />
          <Route path='/about' element={<About />} />
        </Routes>
    </div>
      
    </>
  )
}

export default App

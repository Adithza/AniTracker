import React from 'react'
import { Link } from 'react-router'
import { useAuthStore } from '../assets/authStore'



const Navbar = () => {

  const { isAuthenticated, logout} = useAuthStore();


  return (
    <div className='border-b-1 border-gray-700 h-[60px] w-full  flex pt-1 space-x-4'>
        <img src='A.svg' className='h-9/10 ml-4'/>
        <div className='pt-2.5 text-xl flex w-full mr-5 space-x-4'>
            <a><Link to={"/"}>AniTracker</Link></a>
            <a className='ml-auto'>{isAuthenticated ? <Link to={"/"} onClick={logout}>Logout</Link> :<Link to={"/login"}>Login/Register</Link>}</a>
            <a><Link to={"/about"}>About</Link></a>
        </div>
    </div>
  )
}

export default Navbar
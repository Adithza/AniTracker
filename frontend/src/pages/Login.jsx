import React from 'react'
import { Link } from 'react-router'

const Login = () => {
  return (
    <div className='flex'>
      <form>
        <label>Username</label>
        <input type='text' className='bg-amber-50'/>
        <label>Password</label>
        <input type='text' className='bg-amber-50'/>
      </form>
      <Link to={"/register"}>Signup</Link>
    </div>
  )
}

export default Login
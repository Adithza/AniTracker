import React, { useState } from 'react'
import { Link } from 'react-router'
import { useAuthStore } from '../assets/authStore'
import { useNavigate } from 'react-router'


const Register = () => {

  const { register, isLoading, isAuthenticated, user , login, checkAuth} = useAuthStore(); 

  const [data, setData] = useState({
    email: '',
    pass: '',
  })

  let navigate = useNavigate();

  const [errors, setErrors] = useState({
    email: '',
    pass: '',
  })

  const hasErrors = Object.values(errors).some((error) => error !== '');
  const hasEmptyFields = Object.values(data).some((field) => !field.trim());


  const handleChange = (e) => {

    const {name, value} = e.target;

    setData((data) => ({...data, [name]: value}))

    if(name === "email"){
      
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      if(!value.trim()){
        setErrors({...errors, email:'This field is required'})
        return;
      }

      if(!emailPattern.test(value)){
        setErrors({...errors, email: `Not a valid email!`})
      } else {
        setErrors({...errors, email: ''})
    }

    if(name === "pass"){
      if(!value.trim()){
        setErrors({...errors, pass:'This field is required'});
        return;
      }

      if(value.length > 16){
        setErrors({...errors, pass:'Password must be less than 16 characters'});
        return;
      }

      if(value.length < 8){
        setErrors({...errors, pass:'Password must be at least 8 characters'});
        return;
      }

      setErrors({...errors, pass:''})
    }

    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(hasEmptyFields){
      alert('Please fill the required fields');
      return;
    } 

    if(hasErrors){
      alert('There is some error');
      return;
    }

    console.log("request sent")

    try {
      const response = await login(data.email, data.pass);
      if(response.success){
        alert("Successfully logged in")
        navigate("/")
      } else {
        alert(response.message)
      }
    } catch(error) {
      alert(error.message)
      console.error("Error:", error)
    }

    
  }

  return (
    <div className='flex flex-col w-full h-screen items-center mt-40'>
      <div className='w-110 p-5 bg-gray-900 rounded-xl'>
        <form className='flex flex-col space-y-4' onSubmit={handleSubmit}>
          <label>Email<span className='ml-5 text-red-500 text-sm'>{(errors.email)}</span></label>
          <input type='text' value={data.email} name='email' onChange={handleChange} className='input-style'/>
          
          <label>Password<span className='ml-5 text-red-500 text-sm'>{(errors.pass)}</span></label>
          <input type='password' value={data.pass} name='pass' onChange={handleChange} className='input-style'/>
         
          <input type='submit' className=' border-2 mt-4 text-xl p-3 rounded-xl w-40' value={(isLoading) ? "Loading..." : "Login"}/>
          
        </form>

      </div>
      <p className='mt-2'>Not a member? <Link to={"/register"} className='text-blue-500'>Register</Link></p>
    </div>
  )
}

export default Register
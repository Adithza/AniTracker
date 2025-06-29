import React, { useState } from 'react'
import { Link } from 'react-router'

const Register = () => {

  const [data, setData] = useState({
    email: '',
    username: '',
    pass: '',
    passCon: ''
  })

  const [errors, setErrors] = useState({
    email: '',
    username: '',
    pass: '',
    passCon:''
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
    }

    if(name === "username"){
      
      if(!value.trim()){
        setErrors({...errors, username:'This field is required'});
        return;
      } else {
        setErrors({...errors, username:''})
      }


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

    if(name === "passCon"){
      if(value !== data.pass){
        setErrors({...errors, passCon: 'Password does not match'});
        return;
      } else {
        setErrors({...errors, passCon:''})
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
      const response = await fetch("http://localhost:3000/auth", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({email: data.email, username: data.username, password: data.pass})
      })
  
      const responseText = await response.text();
      console.log(responseText)
    } catch(error) {
      console.error("Error:", error)
    }

    
  }

  return (
    <div className='flex flex-col w-full h-screen items-center mt-40'>
      <div className='w-110 p-5 bg-gray-900 rounded-xl'>
        <form className='flex flex-col space-y-4' onSubmit={handleSubmit}>
          <label>Email<span className='ml-5 text-red-500 text-sm'>{(errors.email)}</span></label>
          <input type='text' value={data.email} name='email' onChange={handleChange} className='input-style'/>
          <label>Username<span className='ml-5 text-red-500 text-sm'>{(errors.username)}</span></label>
          <input type='text' value={data.username} name='username' onChange={handleChange} className='input-style'/>
          <label>Password<span className='ml-5 text-red-500 text-sm'>{(errors.pass)}</span></label>
          <input type='password' value={data.pass} name='pass' onChange={handleChange} className='input-style'/>
          <label>Confirm Password<span className='ml-5 text-red-500 text-sm'>{(errors.passCon)}</span></label>
          <input type='password' value={data.passCon} name='passCon' onChange={handleChange} className='input-style'/>
          <input type='submit' className=' border-2 mt-4 text-xl p-3 rounded-xl w-40' value={'Register'}/>
        </form>

      </div>
      <p className='mt-2'>Already a member? <Link to={"/login"} className='text-blue-500'>Login</Link></p>
    </div>
  )
}

export default Register
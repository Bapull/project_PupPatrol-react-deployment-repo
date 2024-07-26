import React, { useState }  from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Register.css'
const Register = () => {
  const navigate = useNavigate()
  const [inputs, setInputs] = useState({
    name:"",
    email:"",
    password:""
  })
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")
  const onChange = (e) => {
    let {name, value} = e.target
    setInputs((prev)=>{
      return {
        ...prev,
        [name]:value
      }
    })
  }
  const onSubmit = (e) => {
    e.preventDefault()

    if(inputs.password !== confirmPassword){
      setMessage("비밀번호가 맞지 않습니다.")
      return
    }

    fetch("http://localhost:8000/api/register",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(inputs)
    }).then((response)=>response.json())
    .then((data)=>localStorage.setItem('token',data.token))
    .then(()=>{
      navigate("/personal")
    }).catch(()=>{
      setMessage("회원가입중 문제가 발생했습니다. 다시 시도해주세요")
    })
  }
  return (
    <form onSubmit={onSubmit} className='container'>
      <input type="text" name='name' value={inputs.name} onChange={onChange} placeholder=" Name" className='loginInput'/>
      <input type="email" name='email' value={inputs.email} onChange={onChange} placeholder=" Email" className='loginInput'/>
      <input type="password" name='password' value={inputs.password} onChange={onChange} placeholder=" Password" className='loginInput' minLength={8}/>
      <input type="password" name='confirmPassword' value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} placeholder=" Confirm Password" className='loginInput' minLength={8}/>
      <p>{message}</p>
      <button type='submit' className='loginButton'>Create Account</button>
      
    </form>
  )
}

export default Register
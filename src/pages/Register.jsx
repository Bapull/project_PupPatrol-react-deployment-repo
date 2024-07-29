import React, { useState }  from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Register.css'
import {loginApi, putApi, getApi, postApi, patchApi, deleteApi} from '../utils/fetchAPI'
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

    loginApi("http://localhost:8000/api/register",inputs)
    .then(()=>{
      navigate("/personal")
    }).catch(()=>{
      setMessage("이미 있는 아이디입니다. 다시 시도해주세요")
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
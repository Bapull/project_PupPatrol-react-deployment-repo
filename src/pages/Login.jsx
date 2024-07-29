import React,{useState} from 'react'
import '../styles/Login.css'
import { useNavigate } from 'react-router-dom'
import {loginApi} from '../utils/fetchAPI'
const Login = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email:"",
    password:""
  })
  const [error, setError] = useState("")
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
    e.preventDefault();
    loginApi("http://localhost:8000/api/login", inputs)
    .then(()=>{
      navigate("/personal")
    }).catch(
      (e)=>setError("아이디나 비밀번호가 잘못되었습니다.")
    )
  }
  return (
    <form onSubmit={onSubmit} className='container'>
      <input type="email" name='email' value={inputs.email} onChange={onChange} placeholder=" Email" className='loginInput'/>
      <input type="password" name='password' value={inputs.password} onChange={onChange} placeholder=" Password" className='loginInput' minLength={8}/>
      <button type='submit' className='loginButton'>Login</button>
      <p>{error}</p>
      <p>계정이 없으신가요?</p>
      <a href="/register">Sign in</a>
    </form>
  )
}

export default Login
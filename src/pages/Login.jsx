import React,{useState} from 'react'
import '../styles/Login.css'
import { useNavigate } from 'react-router-dom'
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
    fetch("http://localhost:8000/api/login",{
      // 로그인은 데이터 추가는 아니지만, body에 아이디 비밀번호를 보내야 해서 post로 보냅니다. get은 body가 없어요
      method:"POST",
      headers:{
        // 없으면 오류남!
        "Content-Type":"application/json"
      },
      body:JSON.stringify(inputs)
    }).then(
      (response)=>{
        if(!response.ok){
          throw new Error()
        }
        return response.json()}
    )
    .then((json)=>{
      localStorage.setItem('token',json.token)
    }).then(()=>{
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
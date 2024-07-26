import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Personal = () => {
  const [myName, setMyname] = useState("")
  const navigate = useNavigate()
  useEffect(
    ()=>{
      if(!localStorage.getItem('token')){
        alert('올바르지 않은 접근입니다.')
        navigate('/')
        return
      }
      fetch("http://localhost:8000/api/me",{
        headers:{
          "Content-Type":"application/json",
          "Authorization":`bearer ${localStorage.getItem('token')}`
        }
      }).then((response)=>response.json())
      .then((data)=>{setMyname(data[0].name)})
      .catch(()=>{
        console.log("토큰 만료로 다시 시도중")
        fetch("http://localhost:8000/api/refresh",{
          headers:{
            "Content-Type":'application/json',
            'Authorization':`bearer ${localStorage.getItem('token')}`
          }
        }).then((response)=>response.json())
        .then((data)=>{
          localStorage.setItem('token',data.newToken)
          return data.newToken 
        })
        .then(
          (token)=>{
            fetch("http://localhost:8000/api/me",{
              headers:{
                "Content-Type":"application/json",
                "Authorization":`bearer ${token}`
              }
            }).then((response)=> response.json())
            .then((data)=>{setMyname(data[0].name)})
            .catch(()=>{
              localStorage.removeItem('token')
              alert("로그인이 만료되었습니다. 다시 로그인해주세요")
              navigate('/')
            })
          }
          
        )
      })
    }
  )
  const onClick = () => {
    localStorage.removeItem('token')
    navigate("/")
  }
  return (
    <div style={{
      color:"white"
    }}>{myName}
    <button onClick={onClick}>Logout</button></div>
  )
}

export default Personal
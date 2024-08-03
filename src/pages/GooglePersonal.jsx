import React from 'react'
import { getTokenApi } from '../utils/fetchAPI'

const GooglePersonal = () => {
    getTokenApi('http://127.0.0.1:8000/api/auth/google')
    .then((response)=>console.log(response))
    
  return (
    <div>
        GooglePersonal
    </div>
  )
}

export default GooglePersonal
import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button>유저 관리</button>
      <button onClick={()=>{navigate('/answer-information-page')}}>Answer/Information 수정</button>
    </div>
  )
}

export default AdminPage
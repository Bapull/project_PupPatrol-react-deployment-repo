import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Image from '../components/Image';
import axios from '../lib/axios';
import './TipsDetail.css'

const TipsDetail = () => {

  const { state } = useLocation();
  const navigator = useNavigate();
  const [post, setPost] = useState([])
  useEffect(() => {
    setPost(JSON.parse(state.postContent))
  }, [])

  // 기존 정보 받아오기 
  return (
    <div>
      <div className='TipsDetailContainer'>
        <h1>Title : {state.postTitle}</h1>
        {post.map((item,index) => {
          if (item.substr(0, 7) === '(IMAGE)') {
            return <Image key={index} className={'TipsDetailImage'} folder={'board'} fileName={item.substr(7)} />
          } else {
            return <p key={index}>내용 : {item}</p>
          }
        })}
        {/* board-update-test -> tips-update-test */}
        <button className='TipsDetailButton' onClick={() => { navigator('/tips-update-test', { state: state }) }}>수정</button>
        {/* posts -> tips */}
        <button className='TipsDetailButton' onClick={() => { axios.delete(`http://localhost:8000/api/posts/${state.id}`).then(navigator('/tipsList-test')) }}>삭제</button>
      </div>
    </div>
  )
}

export default TipsDetail
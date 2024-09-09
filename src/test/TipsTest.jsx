import React, { createElement, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../lib/axios'
import TipsInputForm from './TipsInputForm'
import './TipsTest.css'


const TipsTest = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const navigator = useNavigate();

  useEffect(() => {
    const formData = new FormData();
    formData.append('postTitle', title)
    formData.append('postContent', JSON.stringify(content))
    if (content) {
      // posts -> tips 로 변경 (백엔드 post 주소)  
      axios.post('http://localhost:8000/api/posts', formData)
    }
  }, [content])

  return (
    <>
      <div className='TipsTestContainer'>
        <h1>TipsInput</h1>
        <input className='TipsInput' placeholder='제목을 적어주세요' type="text" onChange={(e) => setTitle(e.target.value)} value={title} />
        <TipsInputForm setContent={setContent} />
        {content && <button onClick={() => { navigator('/tipsList-test') }}>업로드한 글 테스트</button>}
      </div>
    </>

  )
}

export default TipsTest
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { imageDownloadApi } from '../utils/fetchAPI';
import axios from '../lib/axios';
import TipsInputForm from './TipsInputForm';
import './TipsUpdateTest.css'
const TipsUpdateTest = () => {
  const { state } = useLocation();
  const [content, setContent] = useState('')
  const [title, setTitle] = useState(state.postTitle)
  const navigator = useNavigate();


  useEffect(() => {
    const formData = new FormData();
    formData.append('postTitle', title)
    formData.append('postContent', JSON.stringify(content))
    formData.append('_method', 'PATCH')
    if (content) {
      axios.post(`http://localhost:8000/api/posts/${state.id}`, formData)
    }
  }, [content])

  return (
    <>
      <div className='TipsUpdateFormContainer'>
        <h1>TipsUpdate</h1>
        <div><input className='TipsUpdateInput' placeholder='제목을 적어주세요' type="text" onChange={(e) => setTitle(e.target.value)} value={title} /></div>
        <TipsInputForm content={state} setContent={setContent} />
        {content && <button onClick={() => { navigator('/tipsList-test') }}>업로드한 글 테스트</button>}
      </div>
    </>

  )
}

export default TipsUpdateTest
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { imageDownloadApi } from '../utils/fetchAPI';
import BoardInputForm from './BoardInputForm';
import axios from '../lib/axios';

const TipsUpdateTest = () => {
  const {state} = useLocation();
  // content -> text 변경 
  const [text, setText] = useState('')
  const [title, setTitle] = useState(state.postTitle)
  const navigator = useNavigate();
  
  useEffect(()=>{
    const formData = new FormData();
    formData.append('postTitle',title)
    formData.append('postContent',JSON.stringify(text))
    formData.append('_method', 'PATCH')
    if(text){
      // posts -> tips 변경
      axios.post(`http://localhost:8000/api/tips/${state.id}`,formData)
    }
  },[text])

  return (
    <>
    <div>제목<input type="text" onChange={(e)=>setTitle(e.target.value)} value={title}/></div>
    <BoardInputForm content={state} setContent={setText}/>
    {text&&<button onClick={()=>{navigator('/tipsList-test')}}>업로드한 글 테스트</button>}
    </>
  )
}

export default TipsUpdateTest
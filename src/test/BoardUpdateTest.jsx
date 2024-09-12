import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { imageDownloadApi } from '../utils/fetchAPI';
import BoardInputForm from './BoardInputForm';
import axios from '../lib/axios';

const BoardUpdateTest = () => {
  const {state} = useLocation();
  const [content, setContent] = useState('')
  const [title, setTitle] = useState(state.postTitle)
  const navigator = useNavigate();

  console.log(state);
  
  useEffect(()=>{
    const formData = new FormData();
    formData.append('postTitle',title)
    formData.append('postContent',JSON.stringify(content))
    formData.append('_method', 'PATCH')
    if(content){
      axios.post(`http://localhost:8000/api/posts/${state.id}`,formData)
    }
  },[content])

  return (
    <>
    <div>제목<input type="text" onChange={(e)=>setTitle(e.target.value)} value={title}/></div>
    {/* 수정기능 */}
    <BoardInputForm content={state} setContent={setContent}/>
    {content&&<button onClick={()=>{navigator('/list-test')}}>업로드한 글 테스트</button>}
    </>
  )
}

export default BoardUpdateTest
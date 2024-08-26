import React, {createElement, useEffect, useRef, useState} from 'react'
import {imageDeleteApi, imageUploadApi} from '../utils/fetchAPI'
import { useNavigate } from 'react-router-dom'
import BoardInputForm from './BoardInputForm'
import axios from '../lib/axios'
const BoardTest = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const navigator = useNavigate();
  
  useEffect(()=>{
    const formData = new FormData();
    formData.append('postTitle',title)
    formData.append('postContent',JSON.stringify(content))
    if(content){
      axios.post('http://localhost:8000/api/posts',formData)
    }
  },[content])

  return (
    <>
    <div>제목<input type="text" onChange={(e)=>setTitle(e.target.value)} value={title}/></div>
    <BoardInputForm setContent={setContent}/>
    {content&&<button onClick={()=>{navigator('/list-test')}}>업로드한 글 테스트</button>}
    </>
    
  )
}

export default BoardTest
import React, {createElement, useEffect, useRef, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../lib/axios'
import TipsInputForm from './TipsInputForm'


const TipsTest = () => {
  const [title, setTitle] = useState('')
  // content -> text 변경
  const [text, setText] = useState('')
  const navigator = useNavigate();
  
  useEffect(()=>{
    const formData = new FormData();
    formData.append('tipsTitle',title)
    formData.append('tipsText',JSON.stringify(text))
    if(text){
      // posts -> tips 로 변경 (백엔드 post 주소)  
      axios.post('http://localhost:8000/api/tips',formData)
    }
    // content에서 text로 고침 
  },[text])

  return (
    <>
    <div>Title<input type="text" onChange={(e)=>setTitle(e.target.value)} value={title}/></div>
    {/* setContent -> setText 변경 */}
    <TipsInputForm setText={setText}/>
    {/* 이 부분 content -> text 변경, tipsList 경로 */}
    {text&&<button onClick={()=>{navigator('/tipsList-test')}}>업로드한 글 테스트</button>}
    </>
    
  )
}

export default TipsTest
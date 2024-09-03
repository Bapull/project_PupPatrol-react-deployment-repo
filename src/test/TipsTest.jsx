import React, {createElement, useEffect, useRef, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../lib/axios'
import TipsInputForm from './TipsInputForm'
const TipsTest = () => {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const navigator = useNavigate();
  
  useEffect(()=>{
    const formData = new FormData();
    formData.append('tipsTitle',title)
    formData.append('tipsText',JSON.stringify(text))
    if(text){
      axios.post('http://localhost:8000/api/tips',formData)
    }
  },[text])

  return (
    <>
    <div>Title<input type="text" onChange={(e)=>setTitle(e.target.value)} value={title}/></div>
    {/* {text&&<button onClick={()=>{navigator('/list-test')}}>업로드한 글 테스트</button>} */}
    <TipsInputForm setText={setText}/>
    </>
    
  )
}

export default TipsTest
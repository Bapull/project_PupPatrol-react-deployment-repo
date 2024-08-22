import React, {createElement, useState} from 'react'
import './BoardTest.css'
import Post from './Post'
import {imageUploadApi} from '../utils/fetchAPI'
const BoardTest = () => {
  const [input, setInput] = useState('')
  const [description, setDescription] = useState("");
  const [text, setText] = useState('')
  const imgUpload = async (e) => {
    const container = document.querySelector("#container")
    const p = document.createElement('p')
    p.textContent = input
    container.appendChild(p)
    const image = e.target.files[0]
    const imageSrc = URL.createObjectURL(image)
    const preview = document.createElement('img')
    preview.src = imageSrc
    preview.style.width = "100px"
    container.appendChild(preview)
    setInput('')
    const response = await imageUploadApi('http://localhost:8000/api/imageUpload',"board",image)
    setDescription(prev=>`${prev}\n${input}\n;@${response.data};\n`)
  }
  return (
    <>
    <input type='file' onChange={imgUpload}/>
    <div id='container'></div>
    <textarea className='inputField' value={input} onChange={(e)=>setInput(e.target.value)}/>
    <div>---------------서버에 보내질 텍스트---------------</div>
    <div>{description}</div>
    <div>-------------텍스트로 게시글 불러와 지는지 체크------------------------</div>
    <input type="text" value={text} onChange={(e)=>setText(e.target.value)}/>
    <Post text={text}/>
    </>
    
  )
}

export default BoardTest
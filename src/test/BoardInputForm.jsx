import React,{useEffect, useRef, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { imageDeleteApi, imageDownloadApi, imageUploadApi } from '../utils/fetchAPI'
import Image from '../components/Image'
import './BoardInputForm.css'

const BoardInputForm = ({setContent, content}) => {
  
  const autoResizeTextarea = () => {
    const textareas = document.querySelectorAll('.autoTextarea')

    textareas.forEach((element)=>{
      element.style.height = 'auto'
      let height = element.scrollHeight
      element.style.height = `${height + 8}px`
    })
  }

  const imgClick = (e) =>{
    
    imageDeleteApi('http://localhost:8000/api/imageDelete', 'board', e.target.id)

    const substance = document.querySelector("#substance")
    const removeP = document.getElementById(e.target.id+'imageText')
    substance.removeChild(removeP)
    substance.removeChild(e.target)
    const children = document.querySelectorAll("#substance > *")
    // 만약 아무것도 입력안하고 이미지만 추가 했을수도 있으므로, 빈 textarea 찾아서 제거
    children.forEach(element => {
      if(element.value === ''){
        substance.removeChild(element)
      }
    });
    const textarea = document.createElement('textarea')
    textarea.className = 'autoTextarea'
    textarea.onkeyup = autoResizeTextarea
    textarea.onkeydown = autoResizeTextarea
    substance.appendChild(textarea)
  }
  const imgUpload = async (e) => {
    // 모든 인풋을 감싸는 div 찾기
    const substance = document.querySelector("#substance")
    // substance안에 자식 찾기
    const children = document.querySelectorAll("#substance > *")
    // 만약 아무것도 입력안하고 이미지만 추가 했을수도 있으므로, 빈 textarea 찾아서 제거
    children.forEach(element => {
      if(element.value === ''){
        substance.removeChild(element)
      }
    });
    imageUploadApi('http://localhost:8000/api/imageUpload','board',e.target.files[0])
    .then((response)=>response.data)
    .then((imageName)=>{

      const imageText = document.createElement('p')
      imageText.innerText = "(IMAGE)"+imageName
      imageText.style.display = 'none'
      imageText.id = imageName+'imageText'

      const imageSrc = URL.createObjectURL(e.target.files[0])
      const preview = document.createElement('img')
      preview.src = imageSrc
      preview.id = imageName
      console.log(imageName);
      preview.style.width = '100px'
      preview.onclick = imgClick

      const textarea = document.createElement('textarea')
      textarea.className = 'autoTextarea'
      textarea.onkeyup = autoResizeTextarea
      textarea.onkeydown = autoResizeTextarea

      substance.appendChild(imageText)
      substance.appendChild(preview)
      substance.appendChild(textarea)
      e.target.value = ''
    })

   
    
  }

  const onPost = () => {
    const substance = document.querySelectorAll("#substance > *")
    const body = []
    substance.forEach(element=>{
      if(element.tagName === 'TEXTAREA'){
        body.push(element.value)
      }else if(element.tagName === 'P'){
        body.push(element.innerText)
      }
    })
    setContent(body)
  }

  return (
    <>
    
    <button><input type="file" onChange={(e)=>imgUpload(e)}/></button>
    
    <div id='substance'>
      {content&&JSON.parse(content?.postContent).map((item)=>{
        if(item.substr(0,7) === '(IMAGE)'){
          return (
            <>
            <p id={item.substr(7)+'imageText'} style={{display:'none'}}>{item}</p>
            <Image id={item.substr(7)} onClick={imgClick} folder={'board'} fileName={item.substr(7)} style={{width:"100px"}}/>
            </>
          )
        }else{
          return <textarea className='autoTextarea' onKeyUp={autoResizeTextarea} onKeyDown={autoResizeTextarea} defaultValue={item}></textarea>
        }
      })}
      <textarea className='autoTextarea' onKeyUp={autoResizeTextarea} onKeyDown={autoResizeTextarea}></textarea>
    </div>
    <button onClick={onPost}>게시글 업로드</button>
    </>
  )
}

export default BoardInputForm
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { imageDeleteApi, imageDownloadApi, imageUploadApi } from '../utils/fetchAPI'
import Image from '../components/Image'
import './TipsInputForm.css'

// setContent, content -> setText, text 로 변경  
// TipsTest에서 받아옴 
const TipsInputForm = ({ setText, text }) => {

  const autoResizeTextarea = () => {
    const textareas = document.querySelectorAll('.TipsAutoTextarea')

    textareas.forEach((element) => {
      element.style.height = 'auto'
      let height = element.scrollHeight
      element.style.height = `${height + 8}px`
    })
  }

  const imgClick = (e) => {

    imageDeleteApi('http://localhost:8000/api/imageDelete', 'board', e.target.id)

    const substance = document.querySelector("#TipsSubstance")
    const removeP = document.getElementById(e.target.id + 'imageText')
    substance.removeChild(removeP)
    substance.removeChild(e.target)
    const children = document.querySelectorAll("#TipsSubstance > *")
    // 만약 아무것도 입력안하고 이미지만 추가 했을수도 있으므로, 빈 textarea 찾아서 제거
    children.forEach(element => {
      if (element.value === '') {
        substance.removeChild(element)
      }
    });
    const textarea = document.createElement('textarea')
    textarea.className = 'TipsAutoTextarea'
    textarea.onkeyup = autoResizeTextarea
    textarea.onkeydown = autoResizeTextarea
    substance.appendChild(textarea)
  }
  const imgUpload = async (e) => {
    // 모든 인풋을 감싸는 div 찾기
    const substance = document.querySelector("#TipsSubstance")
    // substance안에 자식 찾기
    const children = document.querySelectorAll("#TipsSubstance > *")
    // 만약 아무것도 입력안하고 이미지만 추가 했을수도 있으므로, 빈 textarea 찾아서 제거
    children.forEach(element => {
      if (element.value === '') {
        substance.removeChild(element)
      }
    });
    imageUploadApi('http://localhost:8000/api/imageUpload', 'board', e.target.files[0])
      .then((response) => response.data)
      .then((imageName) => {

        const imageText = document.createElement('p')
        imageText.innerText = "(IMAGE)" + imageName
        imageText.style.display = 'none'
        imageText.id = imageName + 'imageText'

        const imageSrc = URL.createObjectURL(e.target.files[0])
        const preview = document.createElement('img')
        preview.src = imageSrc
        preview.id = imageName
        preview.style.width = '100px'
        preview.onclick = imgClick

        const textarea = document.createElement('textarea')
        textarea.className = 'TipsAutoTextarea'
        textarea.onkeyup = autoResizeTextarea
        textarea.onkeydown = autoResizeTextarea

        substance.appendChild(imageText)
        substance.appendChild(preview)
        substance.appendChild(textarea)
        e.target.value = ''
      })
  }

  const onPost = () => {
    const substance = document.querySelectorAll("#TipsSubstance > *")
    const body = []
    substance.forEach(element => {
      if (element.tagName === 'TEXTAREA') {
        body.push(element.value)
      } else if (element.tagName === 'P') {
        body.push(element.innerText)
      }
    })
    // setContent -> setText 변경
    setText(body)
  }

  return (
    <>
      <div className='TipsFormContainer'>
        <button className='TipsFormButton'><input type="file" onChange={(e) => imgUpload(e)} /></button>
        <div  id='TipsSubstance'> 
          <div>
            {/* 여기서 못받아오는중 수정,삭제페이지에서 */}
            {text && JSON.parse(text?.tipsText).map((item) => {
              if (item.substr(0, 7) === '(IMAGE)') {
                return (
                  <>
                    <p id={item.substr(7) + 'imageText'} style={{ display: 'none' }}>{item}</p>
                    <Image id={item.substr(7)} className={'TipsFormImage'} onClick={imgClick} folder={'board'} fileName={item.substr(7)} style={{ width: "500px;" }} />
                  </>
                )
              }
              else {
                return <textarea placeholder='본문입력' className='TipsAutoTextarea' onKeyUp={autoResizeTextarea} onKeyDown={autoResizeTextarea} defaultValue={item}></textarea>
              }
            })}
          </div>
          <textarea placeholder='본문입력' className='TipsAutoTextarea' onKeyUp={autoResizeTextarea} onKeyDown={autoResizeTextarea}></textarea>
        </div>
          <button className='TipsFormButton' onClick={onPost}>팁 게시글 업로드</button>
      </div>
    </>
  )
}

export default TipsInputForm
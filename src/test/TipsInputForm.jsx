import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { imageDeleteApi, imageDownloadApi, imageUploadApi } from '../utils/fetchAPI'
import Image from '../components/Image'
import './TipsInputForm.css'

// TipsTest에서 받아옴 
const TipsInputForm = ({ setContent, content }) => {

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
    // substance.appendChild(textarea)
  }
  // const imgUpload = async (e) => {
  //   // 모든 인풋을 감싸는 div 찾기
  //   const substance = document.querySelector("#TipsSubstance")
  //   // substance안에 자식 찾기
  //   const children = document.querySelectorAll("#TipsSubstance > *")
  //   // 만약 아무것도 입력안하고 이미지만 추가 했을수도 있으므로, 빈 textarea 찾아서 제거
  //   children.forEach(element => {
  //     if (element.value === '') {
  //       substance.removeChild(element)
  //     }
  //   });
  //   imageUploadApi('http://localhost:8000/api/imageUpload', 'board', e.target.files[0])
  //     .then((response) => response.data)
  //     .then((imageName) => {

  //       const imageText = document.createElement('p')
  //       imageText.innerText = "(IMAGE)" + imageName
  //       imageText.style.display = 'none'
  //       imageText.id = imageName + 'imageText'

  //       const imageSrc = URL.createObjectURL(e.target.files[0])
  //       const preview = document.createElement('img')
  //       preview.src = imageSrc
  //       preview.id = imageName
  //       preview.style.width = '100px'
  //       preview.onclick = imgClick

  //       // const textarea = document.createElement('textarea')
  //       // textarea.className = 'TipsAutoTextarea'
  //       // textarea.onkeyup = autoResizeTextarea
  //       // textarea.onkeydown = autoResizeTextarea

  //       substance.appendChild(imageText)
  //       substance.appendChild(preview)
  //       // substance.appendChild(textarea)
  //       e.target.value = ''
  //     })
  // }

  const imgUpload = async (e) => {
    const substance = document.querySelector("#TipsSubstance");
    console.log(substance);
    // 빈 textarea는 제거하지 않음으로써 기존 textarea 유지
    imageUploadApi('http://localhost:8000/api/imageUpload', 'board', e.target.files[0])
      .then((response) => response.data)
      .then((imageName) => {

        const imageText = document.createElement('p');
        imageText.innerText = "(IMAGE)" + imageName;
        imageText.id = imageName + 'imageText';

        const imageSrc = URL.createObjectURL(e.target.files[0]);
        const preview = document.createElement('img');
        preview.src = imageSrc;
        preview.id = imageName;
        preview.onclick = imgClick;

        // 이미지만 추가하고 기존 텍스트 영역은 유지
        const textarea = substance.querySelector('textarea');
        substance.appendChild(imageText)
        substance.appendChild(preview)
        substance.appendChild(textarea)
        // 파일 선택 초기화
        e.target.value = '';
      });
  };


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
    console.log(body);
    setContent(body)
  }

  return (
    <>
      <div className='TipsFormContainer'>
        <button className='TipsFormButton'><input type="file" onChange={(e) => imgUpload(e)} /></button>
        <div id='TipsSubstance'>
          {content && JSON.parse(content?.postContent).map((item) => {
            if (item.substr(0, 7) === '(IMAGE)') {
              return (
                <>
                  <p id={item.substr(7) + 'imageText'} style={{ display: 'none' }}>{item}</p>
                  <Image id={item.substr(7)} className={'TipsFormImage'} onClick={imgClick} folder={'board'} fileName={item.substr(7)} />
                </>
              )
            }
            // else {
            //   return <textarea placeholder='본문입력' className='TipsAutoTextarea' onKeyUp={autoResizeTextarea} onKeyDown={autoResizeTextarea} defaultValue={item}></textarea>
            // }
          })}
          <textarea
            placeholder='본문입력'
            className='TipsAutoTextarea'
            defaultValue={content ? JSON.parse(content?.postContent).map(item => {
              const pngIndex = item.indexOf('.png');
              return pngIndex !== -1 ? item.substring(pngIndex + 4) : item;
            }).join(' ') : null}
          ></textarea>

        </div>
        <button className='TipsFormButton' onClick={onPost}>팁 게시글 업로드</button>
      </div>
    </>
  )
}

export default TipsInputForm
import React, { useState } from 'react'
import {imageUploadApi, imageDownloadApi, imageDeleteApi} from '../utils/fetchAPI'
const ImageTest = () => {
  const [image,setImage] = useState(null);
  const [uploadedImageName, setUploadedImageName] = useState('')
  const [imageName, setImageName] = useState('')
  const [deleteImageName, setDeleteImageName] = useState('')  
  const [downloadedImage, setDownloadedImage] = useState('')
  const onSubmit = async (e) => {
    e.preventDefault();
    // 이미지 요청 보내는 법입니다.
    // imageUploadApi는 url, 폴더 이름, 이미지 파일을 파라미터로 받습니다.
    // 폴더이름은 board, information 2개가 있습니다.
    const response = await imageUploadApi("http://localhost:8000/api/imageUpload",'board',image)
    setUploadedImageName(await response.data)
  }
  
  const onDownload = async (e) =>{
    e.preventDefault();
    // 올린 이미지를 다운 받는 법입니다.
    // imageDownloadApi는 url, 폴더 이름, 파일이름을 파라미터로 받습니다.
    // 파일이름은 imageUploadApi의 리턴값을 사용해야합니다.
    const response = await imageDownloadApi("http://localhost:8000/api/imageDownload","board",imageName)
    console.log(response);
    setDownloadedImage(response)
  }
  const onDelete = async (e) => {
    e.preventDefault();
    // 올린 이미지를 삭제하는 법입니다.
    // imageDeleteApi는 url, 폴더 이름, 파일이름을 파라미터로 받습니다.
    // 파일이름은 imageUploadApi의 리턴값을 사용해야합니다.
    const response = await imageDeleteApi(`http://localhost:8000/api/imageDelete`,"board",deleteImageName)
    console.log(response.data);
  };
  return (
    <div>
      <form action="submit" onSubmit={onSubmit}>
        <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
        <button type='submit'>업로드</button>
      </form>
      <h1>업로드된 파일 명: {uploadedImageName}</h1>
      <form action="submit" onSubmit={onDownload}>
        <input type="text" onChange={(e)=>setImageName(e.target.value)}/>
        <img src={downloadedImage}  alt="downloaded" />
        <button type='submit'>다운로드</button>
      </form>
      <form action="submit" onSubmit={onDelete}>
        <input type="text" onChange={(e)=>setDeleteImageName(e.target.value)}/>
        <button type='submit'>삭제</button>
      </form>
    </div>
  )
}

export default ImageTest
import React, { useState } from 'react'

const ImageTest = () => {
  const [image,setImage] = useState(null);
  const [imageName, setImageName] = useState('')
  const [deleteImageName, setDeleteImageName] = useState('')  
  const [downloadedImage, setDownloadedImage] = useState('')
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image',image)

    fetch("http://localhost:8000/api/imageUpload",{
      method:"POST",
      headers:{
        'folder':'pup-patrol-board-image'
        // 'folder':'pup-patrol-information-image'
      },
      body:formData
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('error',error))
  }
  
  const onDownload = (e) =>{
    e.preventDefault();
    fetch(`http://localhost:8000/api/imageDownload?fileName=${imageName}`,{
      method:"GET",
      headers:{
        'Content-Type': 'application/json',
        'folder':'pup-patrol-board-image'
        // 'folder':'pup-patrol-information-image'
      }
    })
    .then(response => response.json())
    .then(data => setDownloadedImage(data.data))
    .catch(error => console.error('Error:', error));
  }
  const onDelete = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8000/api/imageDelete?fileName=${deleteImageName}`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
          'folder':'pup-patrol-board-image'
        // 'folder':'pup-patrol-information-image'
      },
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  };
  return (
    <div>
      <form action="submit" onSubmit={onSubmit}>
        <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
        <button type='submit'>업로드</button>
      </form>
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
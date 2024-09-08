import React, { useEffect, useState } from 'react'
import { imageDownloadApi } from '../utils/fetchAPI'

const Image = ({id, folder, fileName, style, className, onClick}) => {
  
  const url = 'http://localhost:8000/api/imageDownload'
  const [src, setSrc] = useState('')
  useEffect( () => {
    async function fetchData() {
      const response = await imageDownloadApi(url,folder, fileName);
      setSrc(response)
    }
    fetchData();
  }
  ,[])
  return (
   <img id={id} onClick={onClick} className={className} style={{...style}} src={src} alt="not found" />
  )
}

export default Image
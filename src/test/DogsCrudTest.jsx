import React, {useEffect, useState} from 'react'
import axios from '../lib/axios'
import { imageUploadApi , imageDeleteApi } from '../utils/fetchAPI'
import Image from '../components/Image'
import './DogsCrudTest.css'
const DogsCrudTest = () => {
  // 이미 데이터베이스에 저장된 반려견 목록
  const [dogs, setDogs] = useState([])
  
  // 화면 렌더링
  const [render, setRender]=useState(false)
  
  useEffect(()=>{
    
    // 반려견 정보를 받아와서 dogs에 저장
      axios.get('http://localhost:8000/api/dogs')
      .then(response=>setDogs(response.data.data))
      
  },[render])
  


  // 입력 받기
  const [inputs, setInputs] = useState({
    dogName: "",
    dogBreed: "",
    dogBirthDate: "",
  })

  const [image, setImage] = useState(null)
  const onChange = (e) => {
    setInputs((prev)=>{
      return {
        ...prev,
        [e.target.name] : e.target.value
      }
    })
  }
  
  // post 누르면
  const onClick = async () => {
    // S3에 사진 올리고 그 사진 이름을 받아온다.
    const formData = new FormData();
    if(!image){
      return alert('사진을 선택해주세요')
    }else{
      const imageResponse = await imageUploadApi("http://localhost:8000/api/imageUpload", "dogs", image);
      formData.append('dogPhotoName',imageResponse.data);
    }
  
    Object.keys(inputs).forEach(key=> {
      if(inputs[key] !== ""){
        formData.append(key,inputs[key])
      }
    })
    
    axios.post('http://localhost:8000/api/dogs',formData)
    .then(()=>{setRender(prev=>!prev)})
  }

  const onUpdate = async (id, photoName) => {
    
    const formData = new FormData();
    formData.append("_method", "PATCH")
    Object.keys(inputs).forEach(key=> {
      if(inputs[key] !== ""){
        formData.append(key,inputs[key])
      }
    })
    

    if(!image){
      formData.append('dogPhotoName',photoName)
      axios.post(`http://localhost:8000/api/dogs/${id}`,formData)
      .then(()=>setRender(prev=>!prev))
    }else{
      // 일단 글 먼저 업로드
      axios.post(`http://localhost:8000/api/dogs/${id}`,formData)
      // 기존 이미지 삭제
      imageDeleteApi('http://localhost:8000/api/imageDelete','dogs',photoName)
      // 선택된 이미지 업로드
      const imageResponse = await imageUploadApi("http://localhost:8000/api/imageUpload", "dogs", image)
      
      axios.post(`http://localhost:8000/api/dogs/${id}`,{
        _method:"PATCH",
        dogPhotoName:imageResponse.data
      })
      .then(()=>setRender(prev=>!prev))
    }
    
    
    
  }
  
  

  const onDelete = (id, photoName) => {
    imageDeleteApi('http://localhost:8000/api/imageDelete','dogs',photoName)
    .then(
      axios.delete(`http://localhost:8000/api/dogs/${id}`)
      .then(()=>{setRender(prev=>!prev)})
    )
   }
    

  
  return (
    <div>
    
      <div><label htmlFor="dogName">dogName<input type="text" name="dogName" value={inputs.dogName} onChange={onChange}/></label></div>
      <div><label htmlFor="dogBreed">dogBreed<input type="text" name="dogBreed" value={inputs.dogBreed} onChange={onChange}/></label></div>
      <div><label htmlFor="dogBirthDate">dogBirthDate<input type="date" name="dogBirthDate" value={inputs.dogBirthDate} onChange={onChange}/></label></div>
      <div><label htmlFor="dogPhoto">dogPhoto<input type="file" name="dogPhoto" onChange={(e)=>setImage(e.target.files[0])}/></label></div>
    
      <button onClick={onClick}>post</button>

      

      <div>---------------------------------------</div>
      <div>
        {dogs.map((item,index)=>{
          return (
            
            <div key={item.dogPhotoName}>
              <div>
                <button onClick={()=>{onDelete(item.id, item.dogPhotoName)}}>삭제</button>
                <button onClick={()=>{onUpdate(item.id, item.dogPhotoName)}}>수정</button>
              
              </div>
              <div>id : {item.id}</div>
              <div>dogName : {item.dogName}</div>
              <div>dogBreed : {item.dogBreed}</div>
              <div>dogOwnerEmail : {item.dogOwnerEmail}</div>
              <div>dogBirthDate : {item.dogBirthDate}</div>
              
              <div>dogPhoto : <Image className={'image'} folder={'dogs'} fileName={item.dogPhotoName} style={{width:"200px"}}/></div>
              
              <br />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DogsCrudTest
import React, {useEffect, useState} from 'react'
import axios from '../lib/axios'
import { imageUploadApi , imageDeleteApi } from '../utils/fetchAPI'
import Image from '../components/Image'
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

  const onPut = async (id, photoName) => {
    
    const formData = new FormData();
    Object.keys(inputs).forEach(key=> {
      if(inputs[key] !== ""){
        formData.append(key,inputs[key])
      }
    })

    if(!image){
      formData.append('dogPhotoName',photoName);
    }else{
      // 기존 이미지 삭제
      imageDeleteApi('http://localhost:8000/api/imageDelete','dogs',photoName)
      // 새로운 이미지 추가
      const imageResponse = await imageUploadApi("http://localhost:8000/api/imageUpload", "dogs", image);
      formData.append('dogPhotoName',imageResponse.data);
    }
    formData.append("_method", "PUT")
    axios.post(`http://localhost:8000/api/dogs/${id}`,formData)
    .then(()=>{setRender(prev=>!prev)})
  }
  
  const onPatch = async (id, photoName) => {
    const formData = new FormData();
    Object.keys(inputs).forEach(key=> {
      if(inputs[key] !== ""){
        formData.append(key,inputs[key])
      }
    })

    if(image){
      // 기존 이미지 삭제
      imageDeleteApi('http://localhost:8000/api/imageDelete','dogs',photoName)
      // 새로운 이미지 추가
      const imageResponse = await imageUploadApi("http://localhost:8000/api/imageUpload", "dogs", image);
      formData.append('dogPhotoName',imageResponse.data);
    }
    formData.append("_method", "PATCH")
    axios.post(`http://localhost:8000/api/dogs/${id}`,formData)
    .then(()=>{setRender(prev=>!prev)})
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
            <div key={index}>
              <div>
                <button onClick={()=>{onDelete(item.id, item.dogPhotoName)}}>삭제</button>
                <button onClick={()=>{onPut(item.id, item.dogPhotoName)}}>put</button>
                <button onClick={()=>{onPatch(item.id, item.dogPhotoName)}}>patch</button>
              </div>
              <div>id : {item.id}</div>
              <div>dogName : {item.dogName}</div>
              <div>dogBreed : {item.dogBreed}</div>
              <div>dogOwnerEmail : {item.dogOwnerEmail}</div>
              <div>dogBirthDate : {item.dogBirthDate}</div>
              
              <div>dogPhoto : <Image folder={'dogs'} fileName={item.dogPhotoName} style={{width:"200px"}}/></div>
              
              <br />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DogsCrudTest
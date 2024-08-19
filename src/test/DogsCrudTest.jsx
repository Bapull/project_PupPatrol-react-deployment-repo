import React, {useEffect, useState} from 'react'
import axios from '../lib/axios'
import { imageUploadApi, imageDownloadApi, imageDeleteApi } from '../utils/fetchAPI'

const DogsCrudTest = () => {
  // 이미 데이터베이스에 저장된 반려견 목록
  const [dogs, setDogs] = useState([])
  // dogs 테이블에서 저장된 파일이름으로 찾아온 이미지 주소들을 넣을 배열
  const [loadedImage, setLoadedImage] = useState([])
  // 화면 렌더링
  const [render, setRender]=useState(false)
  
  useEffect(()=>{
    
    // 반려견 정보를 받아와서 dogs에 저장
      axios.get('http://localhost:8000/api/dogs')
      .then((response)=>{
        setDogs(response.data.data)
        return response.data.data
      }).then((data)=>{
        setLoadedImage([])
        // dogs의 열 중 하나인 dogPhotoName을 실제 s3에 저장된 데이터에 접근할 수 있는 url로 변경해서 loadedImage 배열에 저장
        data.map((item)=>{
          console.log(item.id);
          imageDownloadApi('http://localhost:8000/api/imageDownload','dogs',item.dogPhotoName)
          .then((response)=>setLoadedImage(prev=>[...prev,{id: item.id, url:response}]))
        })
      })
  },[render])
  


  // 입력 받기
  const [inputs, setInputs] = useState({
    id:'',
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
      return
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
    .then((res)=>console.log(res))
    .then(()=>{setRender(prev=>!prev)})
  }

  const onPut = async () => {
    
    const formData = new FormData();
    Object.keys(inputs).forEach(key=> {
      if(inputs[key] !== ""){
        formData.append(key,inputs[key])
      }
    })
    if(!image){
      return
    }else{
      // 기존 이미지 삭제
      for(let i = 0; i< dogs.length; i++){
        if(dogs[i].id == inputs.id){
          imageDeleteApi('http://localhost:8000/api/imageDelete','dogs',dogs[i].dogPhotoName)
          break
        }
      }
      // 새로운 이미지 추가
      const imageResponse = await imageUploadApi("http://localhost:8000/api/imageUpload", "dogs", image);
      formData.append('dogPhotoName',imageResponse.data);
    }
    formData.append("_method", "PUT")
    axios.post(`http://localhost:8000/api/dogs/${inputs.id}`,formData)
    .then((res)=>console.log(res))
    .then(()=>{setRender(prev=>!prev)})
  }
  
  const onPatch = async () => {
    const formData = new FormData();
    Object.keys(inputs).forEach(key=> {
      if(inputs[key] !== ""){
        formData.append(key,inputs[key])
      }
    })
    if(!image){
      // 선택된 이미지가 없다면 기존 파일이름을 찾아서 넣는다
      for(let i = 0; i< dogs.length; i++){
      
        if(dogs[i].id == inputs.id){
          formData.append("dogPhotoName", dogs[i].dogPhotoName)
          break
        }
      }
    }else{
      // 선택된 이미지가 있다면 기존 사진을 삭제하고 새로운 이미지를 올린다
      for(let i = 0; i< dogs.length; i++){
        if(dogs[i].id == inputs.id){
          imageDeleteApi('http://localhost:8000/api/imageDelete','dogs',dogs[i].dogPhotoName)
          break
        }
      }

      const imageResponse = await imageUploadApi("http://localhost:8000/api/imageUpload", "dogs", image);
      formData.append('dogPhotoName',imageResponse.data);
    }
    formData.append("_method", "PATCH")
    axios.post(`http://localhost:8000/api/dogs/${inputs.id}`,formData)
    .then(()=>{setRender(prev=>!prev)})
  }

  const onDelete = () => {
    
    for(let i = 0; i< dogs.length; i++){
      
      if(dogs[i].id == inputs.id){
        imageDeleteApi('http://localhost:8000/api/imageDelete','dogs',dogs[i].dogPhotoName)
        .then(
          axios.delete(`http://localhost:8000/api/dogs/${inputs.id}`)
          .then(()=>{setRender(prev=>!prev)})
        )
        break
      }
    }
    
    
    
  }
  
  return (
    <div>
      
      <div><label htmlFor="id">id<input type="text" name='id' value={inputs.id} onChange={onChange} /></label></div>
      <div><label htmlFor="dogName">dogName<input type="text" name="dogName" value={inputs.dogName} onChange={onChange}/></label></div>
      <div><label htmlFor="dogBreed">dogBreed<input type="text" name="dogBreed" value={inputs.dogBreed} onChange={onChange}/></label></div>
      <div><label htmlFor="dogBirthDate">dogBirthDate<input type="date" name="dogBirthDate" value={inputs.dogBirthDate} onChange={onChange}/></label></div>
      <div><label htmlFor="dogPhoto">dogPhoto<input type="file" name="dogPhoto" onChange={(e)=>setImage(e.target.files[0])}/></label></div>
    
      <button onClick={onClick}>post</button>
      <button onClick={onPut}>put</button>
      <button onClick={onPatch}>patch</button>
      <button onClick={onDelete}>delete</button>

      <div>---------------------------------------</div>
      <div>
        {dogs.map((item,index)=>{
          return (
            <div key={index}>
              <div>id : {item.id}</div>
              <div>dogName : {item.dogName}</div>
              <div>dogBreed : {item.dogBreed}</div>
              <div>dogOwnerEmail : {item.dogOwnerEmail}</div>
              <div>dogBirthDate : {item.dogBirthDate}</div>
              
              <div>dogPhoto : <img style={{
                width:"200px"
              }} src={loadedImage[index]?.url} alt="dog" /></div>
              
              <br />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DogsCrudTest
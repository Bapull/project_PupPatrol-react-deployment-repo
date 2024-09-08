import React, { useContext, useEffect, useState } from 'react'
import { useAuth } from '../hooks/auth';
import { imageDeleteApi, imageUploadApi } from '../utils/fetchAPI';
import {ApiContext} from '../contexts/ApiContext'
import axios from '../lib/axios';
import Image from '../components/Image';

const UserUpdate = () => {
  const {apiUrl} = useContext(ApiContext)
  const { user } = useAuth({ middleware: "auth" });
  const [image, setImage]= useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [inputs, setInputs] = useState({
    name:"",
    birthday:""
  })
  useEffect(()=>{
    if(user){
      setInputs({
        name:user.name,
        birthday:user.birthday
      })
    }
  },[user?.name])
  const imageChange = (e) => {
    setImage(e.target.files[0])
    setImageUrl(URL.createObjectURL(e.target.files[0]))
  }
  const onChange = (e) => {
    setInputs((prev)=>{
      return {
        ...prev,
        [e.target.name] : e.target.value
      }
    })
  }
  const onClick = () =>{
    const formData = new FormData();
    formData.append('_method','PATCH')
    if(inputs.name){
      formData.append('name',inputs.name)
    }
    if(inputs.birthday){
      formData.append('birthday',inputs.birthday)
    }
    if(image){
      imageUploadApi(`${apiUrl}/api/imageUpload`,'users',image)
      .then((response)=>response.data)
      .then((name)=>{
        formData.append('profilePicture',name)
      })
      .then(()=>{
        axios.post(`${apiUrl}/api/user-update`,formData)        
      })
      .then(()=>{
        imageDeleteApi(`${apiUrl}/api/imageDelete`,'users',user.profile_picture)
      })
    }else{
      axios.post(`${apiUrl}/api/user-update`,formData)
    }
  }
  console.log(user);
  return (
    <div>
      <div>이름변경<input type="text" name='name' value={inputs.name} onChange={onChange}/></div>
      <div>생일변경<input type="date" name='birthday' value={inputs.birthday} onChange={onChange} /></div>
      {image ? <img style={{width:"100px"}} src={imageUrl} alt=''/> : <Image key={user?.name} style={{width:"100px"}} fileName={user?.profile_picture} folder={'users'}/>}
      <div>프로필변경<input type="file" onChange={imageChange}/></div>
      <button onClick={onClick}>수정하기</button>
    </div>
  )
}

export default UserUpdate
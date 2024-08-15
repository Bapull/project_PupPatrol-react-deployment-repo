import React, {useEffect, useState} from 'react'
import Axios from 'axios'
import { imageUploadApi, imageDownloadApi, imageDeleteApi } from '../utils/fetchAPI'

const DogsCrudTest = () => {
  const axios = Axios.create({
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true,
    withXSRFToken: true
})

  const [dogs, setDogs] = useState([])
  const [render, setRender]=useState(false)
  
  useEffect(()=>{
    async function fetchData() {
      const response = await Axios.get('http://localhost:8000/api/dogs')
      setDogs(response.data.data)

    }
    fetchData()
  },[render])
  



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
  
  const onClick = async () => {
    const imageResponse = await imageUploadApi("http://localhost:8000/api/imageUpload", "dogs", image);
    const formData = new FormData();
    Object.keys(inputs).forEach(key=> {
      if(inputs[key] !== ""){
        formData.append(key,inputs[key])
      }
    })
    formData.append('dogPhotoUrl',imageResponse.data);
    axios.post('http://localhost:8000/api/dogs',formData)
    .then((res)=>console.log(res))
    .then(()=>{setRender(prev=>!prev)})
  }

  const onPut = () => {
    
    const formData = new FormData();
    
    Object.keys(inputs).forEach(key=> {
      if(inputs[key] !== ""){
        formData.append(key,inputs[key])
      }
    })
    formData.append("_method", "PUT")
    axios.post(`http://localhost:8000/api/dogs/${inputs.id}`,formData)
    .then((res)=>console.log(res))
    .then(()=>{setRender(prev=>!prev)})
  }
  
  const onPatch = () => {
    const formData = new FormData();
    Object.keys(inputs).forEach(key=> {
      if(inputs[key] !== ""){
        formData.append(key,inputs[key])
      }
    })
    formData.append("_method", "PATCH")
    axios.post(`http://localhost:8000/api/dogs/${inputs.id}`,formData)
    .then(()=>{setRender(prev=>!prev)})
  }

  const onDelete = () => {
    axios.delete(`http://localhost:8000/api/dogs/${inputs.id}`)
    .then(()=>{setRender(prev=>!prev)})
  }
  
  return (
    <div>
      
      <div><label htmlFor="id">id<input type="text" name='id' value={inputs.id} onChange={onChange} /></label></div>
      <div><label htmlFor="dogName">dogName<input type="text" name="dogName" value={inputs.dogName} onChange={onChange}/></label></div>
      <div><label htmlFor="dogBreed">dogBreed<input type="text" name="dogBreed" value={inputs.dogBreed} onChange={onChange}/></label></div>
      <div><label htmlFor="dogBirthDate">dogBirthDate<input type="text" name="dogBirthDate" value={inputs.dogBirthDate} onChange={onChange}/></label></div>
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
              <div>dogPhoto : <img  src={item.dogPhotoUrl} alt="dog" /></div>
              
              <br />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DogsCrudTest
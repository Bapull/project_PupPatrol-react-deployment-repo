import React, { useContext, useEffect, useState } from 'react'
import axios from '../lib/axios'
import ApiContext from '../contexts/ApiContext';
import '../styles/AnswerInformation.css'
import AnswerInformationItem from './AnswerInformationItem';
import { imageUploadApi } from '../utils/fetchAPI';

const AnswerInformation = () => {
  
  const { apiUrl } = useContext(ApiContext);
  const [answersAndInformations, setAnswersAndInformations] = useState([])
  const [render, setRender]=useState(false)
  const [image, setImage] = useState(null)
  useEffect(()=>{
    async function fetchData() {
      const answerResponse = await axios.get(`${apiUrl}/api/answers`)
      const informationResponse = await axios.get(`${apiUrl}/api/informations`)
      
      
      const answerMap = []
      
      answerResponse.data.data.forEach((item) => {
        answerMap[item.id]=item;
      })
      const totalMap = informationResponse.data.data.map(item => {
        return {
          id: item.id,
          answerItem: answerMap[item.id],
          informationItem: item
        }
      })
      
      
      setAnswersAndInformations(totalMap)
    }
    fetchData()
  },[render])
  
  const [inputs, setInputs] = useState({
    answerIsBig: "",
    answerIsFluff: "",
    answerIsWalking: "",
    answerIsSmart: "",
    answerIsShyness: "",
    answerIsBiting: "",
    answerIsNuisance: "",
    answerIsIndependent: "",
    informationDogName:"",
    informationDogCharacter:"",
    informationMinSize:"",
    informationMaxSize:"",
    informationMinCost:"",
    informationMaxCost:"",
    informationDogText:"",
    informationDogGeneticillness:"",
    informationCaution:"",
  })
  
  const onChange = (e) => {
    setInputs((prev)=>{
      return {
        ...prev,
        [e.target.name] : e.target.value
      }
    })
  }
  
  const onClick = (e) => {
    e.preventDefault();
    
    const answerFormData = new FormData();
    const informationFormData = new FormData();
    Object.keys(inputs).forEach(key=>{
      if(key.substring(0,6)==='answer'){
        if(inputs[key] != '1'){
          answerFormData.append(key,5)
        }else{
          answerFormData.append(key,inputs[key])
        }
      }else{
        informationFormData.append(key,inputs[key])
      }
    })
    axios.post(`${apiUrl}/api/answers`,answerFormData)
    
    imageUploadApi(`${apiUrl}/api/imageUpload`, 'information', image)
    .then((response)=>informationFormData.append("informationImageName",response.data))
    .then(()=>{axios.post(`${apiUrl}/api/informations`,informationFormData)})
    .then(()=>{setRender(prev=>!prev)})

    
  }

   
   
   
   
   
   
   
  
  return (
    <>
    <form onSubmit={onClick}>
      <div>이름 : <input type="text" name="informationDogName" onChange={onChange} value={inputs.informationDogName} required/></div>
      <div>성격 : <input type="text" name="informationDogCharacter" onChange={onChange} value={inputs.informationDogCharacter} required/></div>
      <div>이미지 선택 <input type="file" onChange={(e)=>setImage(e.target.files[0])} required/></div>
      <div>최소 크기 : <input type="text" name="informationMinSize" onChange={onChange} value={inputs.informationMinSize} required/></div>
      <div>최대 크기 : <input type="text" name="informationMaxSize" onChange={onChange} value={inputs.informationMaxSize} required/></div>
      <div>최소 비용 : <input type="text" name="informationMinCost" onChange={onChange} value={inputs.informationMinCost} required/></div>
      <div>최대 비용 : <input type="text" name="informationMaxCost" onChange={onChange} value={inputs.informationMaxCost} required/></div>
      <div>설명 : <textarea type="text" name="informationDogText" onChange={onChange} value={inputs.informationDogText} required/></div>
      <div>가진 유전병 : <textarea type="text" name="informationDogGeneticillness" onChange={onChange} value={inputs.informationDogGeneticillness} required/></div>
      <div>주의 사항 : <textarea type="text" name="informationCaution" onChange={onChange} value={inputs.informationCaution} required/></div>

      <div><label htmlFor="answerIsBig">대형견인가요?<input type="text" name="answerIsBig" value={inputs.answerIsBig} onChange={onChange} required/></label></div>
      <div><label htmlFor="answerIsFluff">장모견인가요?<input type="text" name="answerIsFluff" value={inputs.answerIsFluff} onChange={onChange} required/></label></div>
      <div><label htmlFor="answerIsWalking">운동이 많이 필요한가요?<input type="text" name="answerIsWalking" value={inputs.answerIsWalking} onChange={onChange} required/></label></div>
      <div><label htmlFor="answerIsSmart">지능이 높은가요?<input type="text" name="answerIsSmart" value={inputs.answerIsSmart} onChange={onChange} required/></label></div>
      <div><label htmlFor="answerIsShyness">낯가림이 심한가요?<input type="text" name="answerIsShyness" value={inputs.answerIsShyness} onChange={onChange} required/></label></div>
      <div><label htmlFor="answerIsBiting">입질이 많은가요?<input type="text" name="answerIsBiting" value={inputs.answerIsBiting} onChange={onChange} required/></label></div>
      <div><label htmlFor="answerIsNuisance">유전병을 가지고 있나요?<input type="text" name="answerIsNuisance" value={inputs.answerIsNuisance} onChange={onChange} required/></label></div>
      <div><label htmlFor="answerIsIndependent">독립심이 있나요?<input type="text" name="answerIsIndependent" value={inputs.answerIsIndependent} onChange={onChange} required/></label></div>

      <button>추가</button>
      
      </form>
      <div>---------------------------------------</div>
      {answersAndInformations.map((item)=>{
        return (<AnswerInformationItem key={item.id} item={item} />)
      })}
      </>
      
    
  )
}

export default AnswerInformation
import React, { useContext, useEffect, useState } from 'react'
import Image from '../components/Image'
import axios from '../lib/axios'
import {ApiContext} from '../contexts/ApiContext'
import { imageDeleteApi } from '../utils/fetchAPI'
const AnswerInformationItem = ({item : {id, answerItem, informationItem}}) => {
  const { apiUrl } = useContext(ApiContext);
  
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
  useEffect(()=>{
    Object.keys(answerItem).forEach(key=>{
      setInputs(prev=>({...prev, [key]:answerItem[key]}))
    })

    Object.keys(informationItem).forEach(key=>{
      setInputs(prev=>({...prev, [key]:informationItem[key]}))
    })
  },[])
  const onChange = (e) => {
    setInputs(prev=>{return {...prev,[e.target.name]:e.target.value}})
  }

  const onUpdate = () => {
    const answerFormData = new FormData();
    const informationFormData = new FormData();
    answerFormData.append("_method","PUT")
    informationFormData.append("_method","PUT")
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
    axios.post(`${apiUrl}/api/answers/${id}`,answerFormData)
    
    axios.post(`${apiUrl}/api/informations/${id}`,informationFormData)
    
  }

  const onDelete = () => {
    axios.delete(`${apiUrl}/api/answers/${id}`)
    imageDeleteApi(`${apiUrl}/api/imageDelete`,'information',informationItem.informationImageName)
    axios.delete(`${apiUrl}/api/informations/${id}`)
  }
  return (
    <div className='item'>
      <button onClick={()=>{console.log(inputs)}}>ghkrdls</button>
      <div>id: {id} <button onClick={onUpdate}>수정</button><button onClick={onDelete}>삭제</button></div>
      <Image fileName={informationItem.informationImageName} folder={'information'} className={'photo'}/>
      <div>이름 : <input type="text" name={"informationDogName"} onChange={onChange} value={inputs.informationDogName} /></div>
      <div>성격 : <input type="text" name={"informationDogCharacter"} onChange={onChange} value={inputs.informationDogCharacter} /></div>
      <div>최소 크기 : <input type="text" name={"informationMinSize"} onChange={onChange} value={inputs.informationMinSize} /></div>
      <div>최대 크기 : <input type="text" name={"informationMaxSize"} onChange={onChange} value={inputs.informationMaxSize} /></div>
      <div>최소 비용 : <input type="text" name={"informationMinCost"} onChange={onChange} value={inputs.informationMinCost} /></div>
      <div>최대 비용 : <input type="text" name={"informationMaxCost"} onChange={onChange} value={inputs.informationMaxCost} /></div>
      <div>설명 : <textarea type="text" name={"informationDogText"} onChange={onChange} value={inputs.informationDogText} /></div>
      <div>가진 유전병 : <textarea type="text" name={"informationDogGeneticillness"} onChange={onChange} value={inputs.informationDogGeneticillness} /></div>
      <div>주의 사항 : <textarea type="text" name={"informationCaution"} onChange={onChange} value={inputs.informationCaution} /></div>
      <br />
      <div><strong>DBTI</strong></div>
      <div>대형견인가요? <input type="text" name={"answerIsBig"} onChange={onChange} value={inputs.answerIsBig} /></div>
      <div>장모견인가요? <input type="text" name={"answerIsFluff"} onChange={onChange} value={inputs.answerIsFluff} /></div>
      <div>운동이 많이 필요한가요? <input type="text" name={"answerIsWalking"} onChange={onChange} value={inputs.answerIsWalking} /></div>
      <div>지능이 높은가요? <input type="text" name={"answerIsSmart"} onChange={onChange} value={inputs.answerIsSmart} /></div>
      <div>낯가림이 심한가요? <input type="text" name={"answerIsShyness"} onChange={onChange} value={inputs.answerIsShyness} /></div>
      <div>입질이 많은가요? <input type="text" name={"answerIsBiting"} onChange={onChange} value={inputs.answerIsBiting} /></div>
      <div>유전병을 가지고 있나요? <input type="text" name={"answerIsNuisance"} onChange={onChange} value={inputs.answerIsNuisance} /></div>
      <div>독립심이 있나요? <input type="text" name={"answerIsIndependent"} onChange={onChange} value={inputs.answerIsIndependent} /></div>
    </div>
  )
}

export default AnswerInformationItem
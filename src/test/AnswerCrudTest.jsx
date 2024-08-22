import React, {useEffect, useState} from 'react'
import Axios from 'axios'

const AnswerCrudTest = () => {
  const axios = Axios.create({
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true,
    withXSRFToken: true
})

  const [answers, setAnswers] = useState([])
  const [render, setRender]=useState(false)
  useEffect(()=>{
    async function fetchData() {
      const response = await Axios.get('http://localhost:8000/api/answers')
      
      setAnswers(response.data.data)
    }
    fetchData()
  },[render])
  const [inputs, setInputs] = useState({
    id:'',
    answerIsBig: "",
    answerIsFluff: "",
    answerIsWalking: "",
    answerIsSmart: "",
    answerIsShyness: "",
    answerIsBiting: "",
    answerIsNuisance: "",
    answerIsIndependent: "",
  })
  
  const onChange = (e) => {
    setInputs((prev)=>{
      return {
        ...prev,
        [e.target.name] : e.target.value
      }
    })
  }
  
  const onClick = () => {
    const formData = new FormData();
    Object.keys(inputs).forEach(key=> {
      if(inputs[key] !== ""){
          formData.append(key,Number(inputs[key]))
      }
    })
    axios.post('http://localhost:8000/api/answers',formData)
    .then((res)=>console.log(res))
    .then(()=>{setRender(prev=>!prev)})
  }

  const onPut = () => {
    const formData = new FormData();
    
    Object.keys(inputs).forEach(key=> {
      if(inputs[key] !== ""){
        if(inputs[key] === '0'){
          formData.append(key,5)  
        }else{
          formData.append(key,Number(inputs[key]))
        }
      }
    })
    formData.append("_method", "PUT")
    axios.post(`http://localhost:8000/api/answers/${inputs.id}`,formData)
    .then((res)=>console.log(res))
    .then(()=>{setRender(prev=>!prev)})
  }
  
  const onPatch = () => {
    const formData = new FormData();
    Object.keys(inputs).forEach(key=> {
      if(inputs[key] !== ""){
        if(inputs[key] === '0'){
          formData.append(key,5)  
        }else{
          formData.append(key,Number(inputs[key]))
        }
      }
    })
    formData.append("_method", "PATCH")
    axios.post(`http://localhost:8000/api/answers/${inputs.id}`,formData)
    .then(()=>{setRender(prev=>!prev)})
  }

  const onDelete = () => {
    axios.delete(`http://localhost:8000/api/answers/${inputs.id}`)
    .then(()=>{setRender(prev=>!prev)})
  }
  
  return (
    <div>
      
      <div><label htmlFor="id">id<input type="text" name='id' value={inputs.id} onChange={onChange} /></label></div>
      <div><label htmlFor="answerIsBig">answerIsBig<input type="text" name="answerIsBig" value={inputs.answerIsBig} onChange={onChange}/></label></div>
      <div><label htmlFor="answerIsFluff">answerIsFluff<input type="text" name="answerIsFluff" value={inputs.answerIsFluff} onChange={onChange}/></label></div>
      <div><label htmlFor="answerIsWalking">answerIsWalking<input type="text" name="answerIsWalking" value={inputs.answerIsWalking} onChange={onChange}/></label></div>
      <div><label htmlFor="answerIsSmart">answerIsSmart<input type="text" name="answerIsSmart" value={inputs.answerIsSmart} onChange={onChange}/></label></div>
      <div><label htmlFor="answerIsShyness">answerIsShyness<input type="text" name="answerIsShyness" value={inputs.answerIsShyness} onChange={onChange}/></label></div>
      <div><label htmlFor="answerIsBiting">answerIsBiting<input type="text" name="answerIsBiting" value={inputs.answerIsBiting} onChange={onChange}/></label></div>
      <div><label htmlFor="answerIsNuisance">answerIsNuisance<input type="text" name="answerIsNuisance" value={inputs.answerIsNuisance} onChange={onChange}/></label></div>
      <div><label htmlFor="answerIsIndependent">answerIsIndependent<input type="text" name="answerIsIndependent" value={inputs.answerIsIndependent} onChange={onChange}/></label></div>

      <button onClick={onClick}>post</button>
      <button onClick={onPut}>put</button>
      <button onClick={onPatch}>patch</button>
      <button onClick={onDelete}>delete</button>

      <div>---------------------------------------</div>
      <div>
        {answers.map((item,index)=>{
          return (
            <div key={index}>
              <div>id : {item.id}</div>
              <div>answerIsBig : {item.answerIsBig}</div>
              <div>answerIsFluff : {item.answerIsFluff}</div>
              <div>answerIsWalking : {item.answerIsWalking}</div>
              <div>answerIsSmart : {item.answerIsSmart}</div>
              <div>answerIsShyness : {item.answerIsShyness}</div>
              <div>answerIsBiting : {item.answerIsBiting}</div>
              <div>answerIsNuisance : {item.answerIsNuisance}</div>
              <div>answerIsIndependent : {item.answerIsIndependent}</div>
              <br />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AnswerCrudTest
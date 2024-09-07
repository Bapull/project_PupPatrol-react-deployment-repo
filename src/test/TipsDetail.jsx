import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Image from '../components/Image';
import CommentTest from './CommentTest';
import axios from '../lib/axios';

// print-test를 토대로 만듬 즉 수정, 삭제를 위한 상세페이지 
const TipsDetail = () => {
  
  const {state} = useLocation();
  const navigator = useNavigate();
  const [post, setPost] = useState([])
  useEffect(()=>{
    setPost(JSON.parse(state.postContent))
  },[])  
  
  return (
    <div>
      <h1>{state.postTitle}</h1>
      {post.map((item)=>{
        if(item.substr(0,7) === '(IMAGE)'){
          return <Image folder={'board'} fileName={item.substr(7)} style={{width:"200px"}}/>
        }else{
          return <p>{item}</p>
        }
      })}
      {/* board-update-test -> tips-update-test */}
      <button onClick={()=>{navigator('/tips-update-test', {
        state : state
      })}}>수정</button>
      {/* posts -> tips */}                                                                                
      <button onClick={()=>{axios.delete(`http://localhost:8000/api/tips/${state.id}`).then(navigator('/tipsList-test'))}}>삭제</button>
      <CommentTest postId={state.id}/>
    </div>
  )
}

export default TipsDetail
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTokenApi } from "../utils/fetchAPI";
import BackButton from "../components/backButton";
import { useAuth } from "../hooks/auth";

const Dashboard = () => {
  const router = useNavigate();
  // admin 조건부 렌더링 
  const {user}= useAuth({middleware:'auth'})
  const {logout} = useAuth()
  if (!user){
    return(
      <>
      로딩중...
      </>
    )
  }else{
    console.log(user);
  }
  
  return (
    <>
    <BackButton/>
    <div>{user?.name}</div>
    <button onClick={logout}>logout</button>
    <button onClick={()=>{router('/answer-test')}}>answer 작성</button>
    <button onClick={()=>{router('/dog-test')}}>dog 작성</button>
    <button onClick={()=>{router('/image-test')}}>이미지 테스트</button>
    <button onClick={()=>{router('/board-test')}}>게시판 테스트</button>
    <button onClick={()=>{router('/tips-test')}}>팁 테스트</button>
    </>
  )
};

export default Dashboard;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTokenApi } from "../utils/fetchAPI";
import BackButton from "../components/backButton";
import { useAuth } from "../hooks/auth";
import Image from "../components/Image";

const Dashboard = () => {
  const router = useNavigate();
  const { user } = useAuth({ middleware: "auth" });
  const { logout } = useAuth();
  if (!user) {
    return <>로딩중...</>;
  }else{
    console.log(user);
  }

  return (

    <div className="dashboard">
      <BackButton />
      <div className="container">
        <div>생일: {user?.birthday}</div>
        <div>{user?.name}</div>
        {user?.profile_picture && <Image style={{width:"100px"}} fileName={user.profile_picture} folder={'users'} />}
        <button onClick={logout}>logout</button>
        <button
          onClick={() => {
            router("/answer-test");
          }}
        >
          answer 작성
        </button>
        <button
          onClick={() => {
            router("/dog-test");
          }}
        >
          dog 작성
        </button>
        <button
          onClick={() => {
            router("/image-test");
          }}
        >
          이미지 테스트
        </button>
        <button
          onClick={() => {
            router("/boardList");
          }}
        >
          게시판 리스트
        </button>
        <button
          onClick={() => {
            router("/user-update");
          }}
        >
          개인정보수정
        </button>
        {user?.role === 'admin' && <button onClick={()=>{router('/admin-page')}}>관리자 페이지</button>}
      </div>
    </div>
  );

};

export default Dashboard;

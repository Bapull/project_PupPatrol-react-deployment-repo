import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTokenApi } from "../utils/fetchAPI";
import BackButton from "../components/backButton";
import { useAuth } from "../hooks/auth";

const Dashboard = () => {
  const router = useNavigate();
  const { user } = useAuth({ middleware: "auth" });
  const { logout } = useAuth();
  if (!user) {
    return <>로딩중...</>;
  }

  return (

    <div className="dashboard">
      <BackButton />
      <div className="container">
        <div>{user?.name}</div>
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
        {user?.role === 'admin' && <button onClick={()=>{router('/admin-page')}}>관리자 페이지</button>}
      </div>
    </div>
  );

};

export default Dashboard;

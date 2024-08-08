import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTokenApi } from "../utils/fetchAPI";
import BackButton from "../components/backButton";
import { useAuth } from "../hooks/auth";

const Dashboard = () => {
  const {user}= useAuth({middleware:'auth'})
  const {logout} = useAuth()
  if (!user){
    return(
      <>
      로딩중...
      </>
    )
  }
  return (
    <>
    <div>{user?.name}</div>
    <button onClick={logout}>logout</button>
    </>
  )
};

export default Dashboard;

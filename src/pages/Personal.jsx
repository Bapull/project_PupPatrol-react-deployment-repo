import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTokenApi } from "../utils/fetchAPI";
import BackButton from "../components/backButton";

const Personal = () => {
  const [myName, setMyName] = useState("");
  const navigate = useNavigate();

  getTokenApi("http://localhost:8000/api/me").then((response) =>
    setMyName(response[0].name)
  );

  const onClick = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="personal">
      <BackButton />
      <div
        style={{
          color: "white",
        }}
      >
        {myName}
        <button onClick={onClick}>Logout</button>
      </div>
    </div>
  );
};

export default Personal;

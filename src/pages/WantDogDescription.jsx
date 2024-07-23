// 강아지 상세 설명 페이지

import React, { useState, useEffect } from "react";
import "../styles/WantDogDescription.css";
import { Routes, Route, useNavigate } from "react-router-dom";

function WantDogDescription() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    fetchDogs();
  }, []);

  const fetchDogs = async () => {
    const response = await fetch("http://localhost:3001/informations");
    const data = await response.json();
    setDogs(data);
  };

  return (
    <div>
      <div className="container">
        <img
          src="images/Maltese.png"
          alt="Background"
          className="background-image"
        />
        <div className="text-overlay">
          <h1>
            Dog
            <br />
            Name
          </h1>
        </div>
      </div>
      <div className="description">
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchangeddddd
        </p>
      </div>
    </div>
  );
}

export default WantDogDescription;

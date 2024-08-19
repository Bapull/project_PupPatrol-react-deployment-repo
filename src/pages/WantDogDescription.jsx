// 강아지 상세 설명 페이지
import React from "react";
import "../styles/WantDogDescription.css";
import { useNavigate, useLocation } from "react-router-dom";
import BackButton from "../components/backButton";

function WantDogDescription() {
  const location = useLocation();
  const { dog } = location.state;
  const navigate = useNavigate();

  return (
    <div className="wantDogDescription">
      <BackButton />
      <div className="container">
        <img
          src={dog.informationImageName}
          alt="Dog_Image"
          className="background-image"
        />
        <div className="text-overlay">
          <h1>{dog.informationDogName}</h1>
        </div>
      </div>
      <div className="description">
        <h3>성격</h3> <br />
        <h5>{dog.informationDogCharacter}</h5>
        <h3>스타일</h3> <br />
        <h5>{dog.informationDogText}</h5>
        <h4>이 병에 대해선 조심해야해요!</h4> <br />
        <h5>{dog.informationDogGeneticillness}</h5>
        <h4>주의점!</h4> <br />
        <h5>{dog.informationCaution}</h5>
      </div>
    </div>
  );
}

export default WantDogDescription;

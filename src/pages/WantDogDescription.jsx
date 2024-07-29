// 강아지 상세 설명 페이지
import React from "react";
import "../styles/WantDogDescription.css";
import { useNavigate, useLocation } from "react-router-dom";

function WantDogDescription() {
  const location = useLocation();
  const { dog } = location.state;
  const navigate = useNavigate();

  // 뒤로가기 버튼 클릭 시, 뒤로 이동
  const handleClickBack = () => {
    navigate(-1);
  };

  return (
    <div className="wantDogDescription">
      <div className="container">
        <div className="backButtonBox" onClick={handleClickBack}>
          <img
            src="/images/Arrow.png"
            alt="backButton"
            className="backButton"
          />
        </div>
        <img
          src={dog.informationImageUrl}
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
        <h5>{dog.information_caution}</h5>
      </div>
    </div>
  );
}

export default WantDogDescription;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/WantSelect.css";
import BackButton from "../components/backButton";

function WantSelect() {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden"; // 스크롤 숨김
    return () => {
      document.body.style.overflow = ""; // 컴포넌트 언마운트 시 원상 복구
    };
  }, []);

  // wantMBTI 페이지로 이동
  const handleClickMBTI = () => {
    navigate("/wantMBTI");
  };

  // dogSearch 페이지로 이동
  const handleClickSearch = () => {
    navigate("/dogSearch");
  };

  return (
    <div className="wantSelect">
      <BackButton />
      <div className="wantSelect_mbti-box" onClick={handleClickMBTI}>
        <h1 className="mbti-title">DBTI</h1>
      </div>
      <div className="wantSelect_search-box" onClick={handleClickSearch}>
        <h1>Search Dogs</h1>
      </div>
    </div>
  );
}

export default WantSelect;

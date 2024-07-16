// 멍비티아이 진입, 강아지 종 검색 페이지
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/WantSelect.css';

function WantSelect() {
  const navigate = useNavigate();

  const handleClickMBTI = () => {
    setTimeout(() => {
      navigate('/wantMBTI');
    }, 300);
  };

  const handleClickSearch = () => {
    setTimeout(() => {
      navigate('/dogSearch');
    }, 300);
  };

  return (
    <div className="wantSelect">
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

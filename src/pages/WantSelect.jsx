import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/WantSelect.css';

function WantSelect() {
  const navigate = useNavigate();

  // wantMBTI 페이지로 이동
  const handleClickMBTI = () => {
    navigate('/wantMBTI');
  };

  // dogSearch 페이지로 이동
  const handleClickSearch = () => {
    navigate('/dogSearch');
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

// 멍비티아이 진입, 강아지 종 검색 페이지
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/WantSelect.css';

function WantSelect() {
  const [expand, setExpand] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const handleClickMBTI = () => {
    setExpand(true);
    setTimeout(() => {
      navigate('/wantMBTI');
    }, 300);
  };

  const handleClickSearch = () => {
    setExpand(true);
    inputRef.current.focus();
    setTimeout(() => {
      navigate('/dogSearch');
    }, 300);
  };

  return (
    <div className="wantSelect">
      <div className="wantSelect_mbti-box" onClick={handleClickMBTI}>
        <h1>DBTI</h1>
      </div>
      <div className={`wantSelect_search-box ${expand ? 'expand' : ''}`} onClick={handleClickSearch}>
        <input ref={inputRef} type="text" placeholder="Search" />
      </div>
    </div>
  );
}

export default WantSelect;

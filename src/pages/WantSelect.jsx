// 멍비티아이 진입, 강아지 종 검색 페이지
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/WantSelect.css';

function WantSelect() {
  return (
    <div className="wantSelect">
      <Link to="/wantMBTI">
        <div className="wantSelect_mbti-box">
          <h1>DBTI</h1>
        </div>
      </Link>
      <Link to="/dogSearch">
        <div className="wantSelect_search-box">
          <input type="text" placeholder="Search" />
        </div>
      </Link>
    </div>
  );
}

export default WantSelect;

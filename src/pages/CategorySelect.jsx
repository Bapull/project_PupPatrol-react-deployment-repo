// '키우고싶어요' '키우고있어요' 선택 페이지
import React, { useState } from 'react';
import style from '../styles/Category_Select.css';

function CategorySelect() {
  return (
    <div className="CategorySelect">
      <div class="wrapper">
        <div class="content">
          <h5>
            당신은
            <br />
            강아지와 함께 살고 계십니까?
            <div className="horizontal" /> {/* 밑줄 부분 (텍스트 크기 따라감! 굿!) */}
          </h5>

          <div className="buttonBox">
            <button className="button1">YES</button>
          </div>
          <p>아니라면 오른쪽으로 슬라이드</p>
        </div>
      </div>
    </div>
  );
}

export default CategorySelect;

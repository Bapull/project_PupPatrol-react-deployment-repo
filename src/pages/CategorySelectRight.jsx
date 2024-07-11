// '키우고싶어요' '키우고있어요' 선택 페이지
import React, { useState } from 'react';
import style from "../styles/Category_Select.css"

function CategorySelectRight() {


  return (
    <div className="CategorySelectRight">
       <div class="wrapper">
        <div class="content">
          <h5>
            당신은
            <br />
            강아지를 키우고 계십니까?
            <div className="horizontal" />    {/* 밑줄 부분 (텍스트 크기 따라감! 굿!) */}
          </h5>
          <button>YES</button>
        </div>
      </div>
    </div>
  );
}

export default CategorySelectRight;
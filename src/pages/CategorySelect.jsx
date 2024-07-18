// '키우고싶어요' '키우고있어요' 선택 페이지
import { useState } from 'react';
import '../styles/Category_Select.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import WantSelect from './WantSelect';
import DogSearch from './DogSearch';

function CategorySelect() {
  const navigate = useNavigate();

  /*  

  position: 터치 상태에서의 마지막 x좌표
  start: 처음 터치를 했을 때의 시작 x좌표
  leftRight: 페이지 구별을 위해서 만듬. 단, 페이지를 더 추가해야 할 경우 삼항 조건부 렌더링을 변경해야함

  */

  const [position, setPosition] = useState(0);
  const [start, setStart] = useState(0);
  const [leftRight, setLeftRight] = useState("left");


  /*

  oneTouch: 1번 버튼을 누르거나 왼쪽으로 슬라이드 했을 때 작동.
  twoTouch: 2번 버튼을 누르거나 오른쪽으로 슬라이드 했을 때 작동.

  */

  const oneTouch = () => {
    setLeftRight("left")
    document.querySelector('.content').style.transform = 'translate(0vw)';
  }
  const twoTouch = () => {
    setLeftRight("right")
    document.querySelector('.content').style.transform = 'translate(-100vw)';
  }


  /*

  onTouchStart: 마우스 눌렀을 때 발생하는 이벤트 함수. 시작 x좌표를 저장
  onTouchMove: 마우스를 떼고 난 뒤에 남기는 x좌표를 position이라는 state에 저장

  */

  const onTouchStart = (e) => {
    setStart(e.touches[0].clientX)
  }
  const onTouchMove = (e) => {
    setPosition(e.touches[0].clientX)
    if ( start - position > 10) {
      // 슬라이드를 넣고 싶었지만 overflow: hidden이 먹히지 않아.. 버튼을 눌렀을 때와 동일한 함수를 넣어줬습니다..
      twoTouch()
    } else if ( start - position < -10) {
      // 슬라이드를 넣고 싶었지만 overflow: hidden이 먹히지 않아.. 버튼을 눌렀을 때와 동일한 함수를 넣어줬습니다..
      oneTouch()
    }
  }

  // YES 버튼을 눌렀을 때 페이지 이동을 위해 삼항 조건문을 이용
  const onClickYes = () => {
    leftRight === "right" ? navigate("/dogSearch") : navigate("/wantSelect")
  }

  /*

  className 정리
  1. CategorySelect: 모든 태그를 감싸는 페이지 전체의 div
  2. buttonGroup: 슬라이드 화면의 위치를 고정시키기 위한 div
  3. content: choice를 일정한 부분만 화면에 보여주게 해주는 div
  4. choice: width값이 content값을 초과해 왼쪽과 오른쪽에 질문을 넣어놓은 div
  5. choiceHave: 강아지를 키우고 있습니까의 질문만 담당하는 div
  6. buttonBox: YES버튼을 감싸고 있는 div
  7. buttonYes: YES버튼

  */
  return (
    <div className = "CategorySelect">
      <div className = "buttonGroup">
        <button className = { 
          leftRight === "right" ? "buttonOff" : "buttonOn"
        } 
        onTouchEnd = {oneTouch} 
        onClick = {oneTouch}></button>
        <button className = { 
          leftRight === "left" ? "buttonOff" : "buttonOn"
        } 
        onTouchEnd = {twoTouch} 
        onClick = {twoTouch}></button>
      </div>
      <div className = "content" onTouchStart = {onTouchStart} onTouchMove = {onTouchMove}>
        <div className = "choice">
          <div className = "textBox">
            <h5>
              당신은 현재 강아지를 
              <span className = "choiceHave">당신은 현재 강아지를</span>
            </h5>
          </div>
            <div>
              <h5>
                키우고 있지 않습니까?
                <span className = "choiceHave">키우고 있습니까?</span>
              </h5>
            </div>
          </div>
        </div>
      <div className = "buttonBox">
        <button className = "buttonYes" 
          onClick = {onClickYes}
        >YES</button>
      </div>
      <Routes>
        <Route path = '/wantSelect' element = { <WantSelect/> }/>
        <Route path = '/dogSearch' element = { <DogSearch/> }/>
      </Routes>
    </div>
  );
}

export default CategorySelect;

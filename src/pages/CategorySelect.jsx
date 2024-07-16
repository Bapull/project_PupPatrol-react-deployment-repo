// '키우고싶어요' '키우고있어요' 선택 페이지
import { useState, useEffect } from "react";
import style from '../styles/Category_Select.css';

function CategorySelect() {
  const [position, setPosition] = useState(0);
  const [start, setStart] = useState(0);

  const oneTouch = () => {
    document.querySelector('.content').style.transform = 'translate(0vw)';
    document.querySelector('.button1').style.transform = 'scale(1.5)';
    document.querySelector('.button2').style.transform = 'scale(1)';
    document.querySelector('.button1').style.backgroundColor = 'white';
    document.querySelector('.button2').style.backgroundColor = 'rgb(50, 50, 50)';
  }
  const twoTouch = () => {
    document.querySelector('.content').style.transform = 'translate(-100vw)';
    document.querySelector('.button2').style.transform = 'scale(1.5)';
    document.querySelector('.button1').style.transform = 'scale(1)';
    document.querySelector('.button1').style.backgroundColor = 'rgb(50, 50, 50)';
    document.querySelector('.button2').style.backgroundColor = 'white';
    
  }

  const onTouchStart = (e) => {
    setStart(e.touches[0].clientX)
  }
  const onTouchMove = (e) => {
    setPosition(e.touches[0].clientX)
    if ( start - position > 10) {
      twoTouch()
    } else if ( start - position < -10) {
      oneTouch()
    }
  }

  return (
    <div className="CategorySelect">
      <div class="buttonGroup">
        <button class="button1" onTouchEnd={oneTouch} onClick={oneTouch}></button>
        <button class="button2" onTouchEnd={twoTouch} onClick={twoTouch}></button>
      </div>
      <div class="wrapper" onTouchStart={onTouchStart} onTouchMove={onTouchMove}>
        <div class="content">
          <div class="choice">
            <div className="textBox">
              <h5>
                당신은 현재 강아지를 
                <span class="choiceHave">당신은 현재 강이지를</span>
              </h5>
            </div>
              <div>
                <h5>
                  키우고 있습니까?
                  <span className="choiceHave">키우고 있지 않습니까?</span>
                </h5>
              </div>
            </div>
          </div>
      </div>
      <div className="buttonBox">
        <button className="button3">YES</button>
      </div>
    </div>
  );
}

export default CategorySelect;

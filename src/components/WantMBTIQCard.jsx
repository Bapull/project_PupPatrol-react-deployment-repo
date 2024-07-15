// 'WantMBTI.jsx'의 질문 카드 컴포넌트
import React, { useState, useEffect } from 'react'
import '../styles/WantMBTIQCard.css'
import LeftMBTIQCard from './LeftMBTIQCard';
const WantMBTIQCard = ({question, setAnswer,questionVariable,setCurrentQuestionId, leftover, length}) => {
    
    
    /*두 점 사이의 거리를 구하는 함수*/
    function calculateDistance(x1, y1, x2, y2) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const distance = Math.sqrt(dx ** 2 + dy ** 2);
        return distance;
    }
    const [tilt, setTilt] = useState(0); // 기울기
    const [isClicked, setIsClicked] = useState(false) //클릭중인지 아닌지 확인
    const [startPoint, setStartPoint] = useState({
        x:0,
        y:0
    }) // 내가 드래그를 시작한 위치
    const [transformOrigin, setTransformOrigin] = useState({
    x:0,
    y:0 
    }) // 카드 회전축
    const [touchPoint, setTouchPoint] = useState({
        x:0,
        y:0
    }) // 현재 내 터치 위치
    const [falling, setFalling] = useState(false) // 답 선택후 떨어져야하는 상황인지 아닌지 확인
    useEffect(()=>{
        var target = document.getElementById("card")
        setTransformOrigin({x:(target.getBoundingClientRect().right-target.getBoundingClientRect().left),
          y:(target.getBoundingClientRect().bottom + (target.getBoundingClientRect().top-target.getBoundingClientRect().bottom)*0.1)
        })
    },[]) // 컴포넌트가 로딩될때 1번만 회전축의 좌표값을 구함
    const onTouchStart = (e) => {
        setIsClicked(true)
        setStartPoint({x:e.touches[0].clientX,y:e.touches[0].clientY})
    } // 터치를 시작했을때 내 위치를 저장
    const onTouchEnd = (e) => {
        setIsClicked(false)
        // 터치가 끝났을 때 각도가 15도 초과라면 답을 선택했다고 판단
        if(tilt>15 || tilt < -15){
            if((touchPoint.x - startPoint.x)>0){
                setAnswer((prev)=>{
                    return(
                        {
                            ...prev,
                            [questionVariable]:true
                        }
                    )
                })
            }else{
                setAnswer((prev)=>{
                    return(
                        {
                            ...prev,
                            [questionVariable]:false
                        }
                    )
                })
            }
            setFalling(true)
            // 떨어지는 애니메이션 길이가 1초니까 1초후에 다음 질문
            setTimeout(() => {
                setCurrentQuestionId((prev)=>prev+1)    
            }, 450);
        }else{
            setTilt(0)
        }
        
    }
    const onTouchMove = (e) => {
        if(isClicked){
            setTouchPoint({
                x:e.touches[0].clientX,
                y:startPoint.y // x 값만 중요하지 y값은 별로 안 중요함
            })

            //  회전점이랑 사용자가 터치를 시작한 부분의 거리
            let first = calculateDistance(transformOrigin.x,transformOrigin.y,startPoint.x,startPoint.y)
            //  회전점이랑 사용자의 현재 터치 위치의 거리
            let second = calculateDistance(transformOrigin.x,transformOrigin.y,touchPoint.x,touchPoint.y)
            //  터치를 시작한 부분과 현재 터치 위치의 거리
            let third = calculateDistance(startPoint.x,startPoint.y,touchPoint.x,touchPoint.y)
            // 제2 코사인 법칙으로 기울일 각도의 코사인 값 구하기
            let degree = ((-1)*(third*third)+first*first+second*second)/(2*first*second)
            // 아크코사인으로 각도를 구한 한후에, 알맞은 방향으로 꺾음
            if((touchPoint.x - startPoint.x)>0){
                setTilt(Math.acos(degree)*20)
            }else{
                setTilt((-1)*Math.acos(degree)*20)
            }
        }
    }
  return (
    <div className="container" 
    style={{
        position: "relative",
        width: "100%",
        height: "0",
        paddingBottom: "120%"
    }}
    onTouchMove={onTouchMove}
    onTouchStart={onTouchStart}
    onTouchEnd={onTouchEnd}
    >
        {leftover > 0 ? <LeftMBTIQCard leftover={leftover} falling={falling} length={length}/>: null}
        <div id='card'
        className= {falling? tilt < 0 ? "left" :"right" : null}
        style={{
            transformOrigin: "center 90%",
            transform: `rotate(${tilt}deg)`
        }}
        >
            <span className='question'>
                {question}
            </span>
        </div>
    </div>
  )
}

export default WantMBTIQCard
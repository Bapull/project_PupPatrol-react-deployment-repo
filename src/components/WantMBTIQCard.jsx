// 'WantMBTI.jsx'의 질문 카드 컴포넌트
import React, { useState } from 'react'
import '../styles/WantMBTIQCard.css'
const WantMBTIQCard = () => {
    const [tilt, setTilt] = useState(0);
    const [isCllicked, setIsClicked] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const onPointerMove = (e) => {
        if(isCllicked && isMobile ){
            setTilt((prev)=>prev+(e.movementX))
        }
        if(isCllicked){
            setTilt((prev)=>prev+(e.movementX*0.05))
        }
    }
    const onMouseDown = () => {
        setIsClicked(true)
    }
    const onMouseUp = () =>{
        setIsClicked(false)
        setTilt(0)
    }
    const onTouchStart = () => {
        setIsClicked(true)
        setIsMobile(true)
    };
  return (
    <div className="container" 
    style={{
        position: "relative",
        width:"60%",
        height:"0",
        paddingBottom:"90%"
    }}
    onMouseDown={onMouseDown}
    onTouchStart={onTouchStart}
    onMouseUp={onMouseUp}
    onTouchEnd={onMouseUp}
    onPointerMove={onPointerMove}>
        <div id='card' 
            style={{
                transformOrigin: "center 90%",
                transform: `rotate(${tilt}deg)`
            }}
        ></div>
    </div>
  )
}

export default WantMBTIQCard
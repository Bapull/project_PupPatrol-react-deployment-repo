// 'WantMBTI.jsx'의 질문 카드 컴포넌트
import React, { useState } from 'react'
import '../styles/WantMBTIQCard.css'
const WantMBTIQCard = () => {
    const [tilt, setTilt] = useState(0);
    const [isCllicked, setIsClicked] = useState(false)
    const onMouseMove = (e) => {
        if(isCllicked){
            setTilt((prev)=>prev+(e.movementX)*0.1)
        }
    }
    const onMouseDown = () => {
        setIsClicked(true)
    }
    const onMouseUp = () =>{
        setIsClicked(false)
        setTilt(0)
    }

  return (
    <div className="container" 
    style={{
        width:"1500px",
        height:"1500px",
        backgroundColor:"#FFFFFF"
    }}
    onMouseDown={onMouseDown}
    onMouseUp={onMouseUp}>
        <div id='card' 
            onMouseMove={onMouseMove}
            style={{
                transformOrigin: "center 95%",
                transform: `rotate(${tilt}deg)`
            }}
        ></div>
    </div>
  )
}

export default WantMBTIQCard
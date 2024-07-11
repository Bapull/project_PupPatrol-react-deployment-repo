/*남아있는 질문*/
import React, { useEffect, useState } from 'react'
import '../styles/LeftMBTIQCard.css'
import { flushSync } from 'react-dom';

const LeftMBTIQCard = ({leftover, falling, secondQuestion}) => {
    const [cards, setCards] = useState([])
    const [movement, setMovement] = useState(0)
    useEffect(()=>{
        setCards(Array.from({length:(leftover > 5 ? 5:leftover)},(v,i)=>i+1))
    },[leftover])   
    console.log(cards);
    useEffect(()=>{
        if(falling){
            const animation = setInterval(()=>{
                setMovement((prev)=>prev+0.1)
                
            },10)
            setTimeout(() => {
                clearInterval(animation)
            }, 1000);
        }
    },[falling])
    
  return (
    <div>
        {cards.map((item)=>{
                return(
                    <div className='cards'
                    key={item}
                    style={
                    {
                        width: `${50-item*2}%`,
                        height: `${50-item*2}%`,
                        top: `${25-item}%`,
                        left: `${25+item}%`,
                        zIndex: `${100-item}`,
                        opacity:`${(5-item)*0.2+movement*0.025}`,
                        transform:`translate(0px,${movement*0.7}px) scale(${1+movement*0.0023}, ${1+movement*0.0023})`
                    }
                    }
                    ></div>
                )
            })}
        
    </div>
   
    
  )
}

export default LeftMBTIQCard
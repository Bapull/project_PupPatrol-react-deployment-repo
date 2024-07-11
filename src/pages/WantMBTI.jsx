// 멍비티아이 페이지
import React, { useEffect, useState } from 'react'
import WantMBTIQCard from '../components/WantMBTIQCard'
import '../styles/WantMBTI.css'
const WantMBTI = () => {
    const [questions, setQuestions] = useState([])
    const [answer, setAnswer] = useState({})
    useEffect(()=>{
        setQuestions([
            {
              question_id: 1,
              question_text: "근력이 강한 편이신가요?",
              question_variable: "answer_is_big"
            },
            {
              question_id: 2,
              question_text: "방이 지저분하면 스트레스를 많이 받는 편인가요?",
              question_variable: "answer_is_fluff"
            },
            {
              question_id: 3,
              question_text: "평소 달리기나 산책을 좋아하시나요?",
              question_variable: "answer_like_walking"
            },
            {
              question_id: 4,
              question_text: "훈련에 많은 시간을 쓰실 수 있나요?",
              question_variable: "answer_is_smart"
            },
            {
              question_id: 5,
              question_text: "집에 다양한 사람들이 찾아오나요?",
              question_variable: "answer_is_shyness"
            },
            {
              question_id: 6,
              question_text: "가구는 비싼 걸 써야한다고 생각하나요?",
              question_variable: "answer_is_biting"
            },
            {
              question_id: 7,
              question_text: "지인이 아프면 걱정돼서 아무것도 못 하나요?",
              question_variable: "answer_is_nuisance"
            },
            {
              question_id: 8,
              question_text: "집에 자주 못 들어 올 수도 있나요?",
              question_variable: "answer_is_independent"
            }
          ])
    },[])
    const [currentQuestionId,setCurrentQuestionId] = useState(1)
  return (
    <div
    style={{
        width:"100%",
        overflow:"hidden"
    }}>
        <div id='X'>X</div>
        <div id='O'>O</div>
    {
        questions.length < currentQuestionId ? <div>
            <div>answer_is_big {answer.answer_is_big ? "네" : "아니요"}</div>
            <div>answer_is_fluff {answer.answer_is_fluff ? "네" : "아니요"}</div>
            <div>answer_like_walking {answer.answer_like_walking ? "네" : "아니요"}</div>
            <div>answer_is_smart {answer.answer_is_smart ? "네" : "아니요"}</div>
            <div>answer_is_shyness {answer.answer_is_shyness ? "네" : "아니요"}</div>
            <div>answer_is_biting {answer.answer_is_biting ? "네" : "아니요"}</div>
            <div>answer_is_nuisance {answer.answer_is_nuisance ? "네" : "아니요"}</div>
            <div>answer_is_independent {answer.answer_is_independent ? "네" : "아니요"}</div>
        </div> : null
    }
    {
        questions.map((item,index)=>{
            if(index === currentQuestionId-1){
                return(
                    <WantMBTIQCard key={index} 
                    question={item.question_text} 
                    setAnswer={setAnswer} 
                    questionVariable={item.question_variable} 
                    setCurrentQuestionId={setCurrentQuestionId}
                    leftover={questions.length - index -1 }
                    length={questions.length}
                    />
                )
            }
        })
    }
    </div>
  )
}

export default WantMBTI
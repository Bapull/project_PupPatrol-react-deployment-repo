// WantMBTI.jsx
import React, { useEffect, useState, useContext } from 'react';
import WantMBTIQCard from '../components/WantMBTIQCard';
import '../styles/WantMBTI.css';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/backButton';
import ApiContext from '../contexts/ApiContext';
import axios from '../lib/axios';

const WantMBTI = () => {
  // questions: 질문 목록
  // answer: 사용자의 답변
  const [questions, setQuestions] = useState([]);
  const [answer, setAnswer] = useState({});
  const navigate = useNavigate();
  // 의존성 배열에 필요한 변수를 추가,
  const [currentQuestionId, setCurrentQuestionId] = useState(1);
  const { apiUrl } = useContext(ApiContext);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/questions`);
        const data = await response.data;
        setQuestions(data.data);
      } catch (error) {
        console.error('Error fetching questions: ', error);
      }
    };

    fetchQuestions();
  }, [apiUrl]);

  useEffect(() => {
    if (currentQuestionId !== 1 && currentQuestionId > questions.length) {
      const variables = questions.map((item) => item.questionVariable);
      navigate('/wantMBTIResult', {
        state: [answer, variables],
      });
    }
    // 지정된 값이 변경될 때마다 실행되므로 currentQuestionId가 변경될 때마다 포함하여 실행됨
  }, [currentQuestionId, answer, navigate, questions]);

  useEffect(() => {
    document.body.style.overflow = 'hidden'; // 스크롤 숨김
    return () => {
      document.body.style.overflow = ''; // 컴포넌트 언마운트 시 원상 복구
    };
  }, []);

  return (
    <div className="wantMBTI">
      {/* 뒤로가기 */}
      <BackButton />
      <div id="X">X</div>
      <div id="O">O</div>
      {questions.map((item, index) => {
        if (index === currentQuestionId - 1) {
          return (
            <WantMBTIQCard
              key={item.questionText}
              question={item.questionText}
              setAnswer={setAnswer}
              questionVariable={item.questionVariable}
              setCurrentQuestionId={setCurrentQuestionId}
              leftover={questions.length - index - 1}
            />
          );
        }
        return null;
      })}
    </div>
  );
};

export default WantMBTI;

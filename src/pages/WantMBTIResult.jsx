import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/wantMBTIResult.css';
import BackButton from '../components/backButton';
import ApiContext from '../contexts/ApiContext';
import axios from '../lib/axios';
import Image from '../components/Image';
const WantMBTIResult = () => {
  // dogInformation: 강아지 정보를 담는 상태
  // answers: 사용자가 선택한 답변을 담는 상태
  // currentIndex: 현재 보여지는 강아지 정보의 인덱스를 담는 상태
  // touchStart: 터치 시작 지점을 담는 상태
  // touchEnd: 터치 끝 지점을 담는 상태
  const [dogInformation, setDogInformation] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const {
    state: [answer, variable],
  } = useLocation(); // useLocation 훅을 사용하여 state를 가져옴
  const navigate = useNavigate();
  const { apiUrl } = useContext(ApiContext);

  // 컴포넌트가 마운트될 때 강아지 정보와 결과 정보를 가져오는 함수
  useEffect(() => {
    const fetchDogInformation = async () => {
      try {
        const [informationResponse, answersResponse] = await Promise.all([
          axios.get(`${apiUrl}/api/informations`),
          axios.get(`${apiUrl}/api/answers`),
        ]);
        const informationData = await informationResponse.data;
        const answersData = await answersResponse.data;
        setDogInformation(informationData.data);
        setAnswers(answersData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDogInformation();
  }, [apiUrl]);

  useEffect(() => {
    document.body.style.overflow = 'hidden'; // 스크롤 숨김
    return () => {
      document.body.style.overflow = ''; // 컴포넌트 언마운트 시 원상 복구
    };
  }, []);

  // 사용자가 선택한 답변과 일치하는 강아지 정보를 가져오는 함수
  // answer가 true인 경우는 패스, false인 경우에만 키 값이 0인 강아지를 제외
  const matchedDogs = dogInformation.filter((dog) =>
    answers.some(
      (match) => match.id === dog.id && variable.every((varName) => answer[varName] === true || match[varName] !== 0)
    )
  );
  
  // 다음 강아지 정보를 보여주는 함수
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % matchedDogs.length);
  };

  // 이전 강아지 정보를 보여주는 함수
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + matchedDogs.length) % matchedDogs.length);
  };

  // 터치 시작 위치 기록
  const handleTouchStart = (event) => {
    setTouchStart(event.targetTouches[0].clientX);
  };

  // 현재 터치 위치 기록
  const handleTouchMove = (event) => {
    setTouchEnd(event.targetTouches[0].clientX);
  };

  // 터치가 끝났을 때 슬라이드 이동 방향 결정
  // -100~100사이일 시 슬라이드 이동하지 않음
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      handleNext();
    }

    if (touchStart - touchEnd < -100) {
      handlePrev();
    }
  };

  // 카드 클릭 시 상세 설명 페이지로 이동하는 함수
  const handleCardClick = (dog) => {
    navigate('/wantDogDescription', { state: { dog } });
  };

  return (
    <div className="wantMBTIResult">
      {/* 뒤로가기 */}
      <BackButton />
      <h1 className="dogResultTitle">
        What’s
        <br />
        Your
        <br />
        Pet
      </h1>
      {/* dogInformation과 answers는 0일 수 없으므로 빈 배열일 때 로딩 메시지 표시 */}
      {dogInformation.length === 0 || answers.length === 0 ? (
        <p>Loading...</p>
      ) : matchedDogs.length > 0 ? (
        /* 매칭되는 강아지가 있을 때 슬라이더 표시 */
        <div
          className="slider"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="slider-wrapper"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {matchedDogs.map((dog, index) => (
              <div
                key={dog.informationDogName}
                className={`dogCard ${
                  index === currentIndex
                    ? // 현재 보여지는 강아지 카드
                      'active'
                    : index === currentIndex - 1 || (currentIndex === 0 && index === matchedDogs.length - 1)
                    ? // 이전 강아지 카드
                      'prev'
                    : index === currentIndex + 1 || (currentIndex === matchedDogs.length - 1 && index === 0)
                    ? // 다음 강아지 카드
                      'next'
                    : ''
                }`}
                onClick={() => handleCardClick(dog)}
              >
                <Image folder={'information'} fileName={dog.informationImageName} className={'dogImage'}/>
                
                <h2>{dog.informationDogName}</h2>
                <p className="dogCharacter">{dog.informationDogCharacter}</p>
                <p className="dogText">{dog.informationDogText}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* 매칭되는 강아지가 없을 때 표시 */
        <p>No matching dogs found</p>
      )}
    </div>
  );
};

export default WantMBTIResult;

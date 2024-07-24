import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/wantMBTIResult.css';

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

  // 컴포넌트가 마운트될 때 강아지 정보와 결과 정보를 가져오는 함수
  useEffect(() => {
    const fetchDogInformation = async () => {
      try {
        const [informationResponse, answersResponse] = await Promise.all([
          fetch('http://localhost:3001/informations'),
          fetch('http://localhost:3001/answers'),
        ]);
        const informationData = await informationResponse.json();
        const answersData = await answersResponse.json();
        setDogInformation(informationData);
        setAnswers(answersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDogInformation();
  }, []);

  // 사용자가 선택한 답변과 일치하는 강아지 정보를 가져오는 함수
  const matchedDogs = dogInformation.filter((dog) =>
    answers.some(
      (match) => match.dog_id === dog.dog_id && variable.every((varName) => match[varName] === answer[varName])
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
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      handleNext();
    }

    if (touchStart - touchEnd < -50) {
      handlePrev();
    }
  };

  // 카드 클릭 시 상세 설명 페이지로 이동하는 함수
  const handleCardClick = (dog) => {
    navigate('/wantDogDescription', { state: { dog } });
  };

  // 이전 페이지로 이동하는 함수
  const onClickBack = () => {
    navigate('/wantMBTI');
  };

  return (
    <div className="wantMBTIResult">
      <h1 className="dogResult_title">
        What’s
        <br />
        Your
        <br />
        Pet
      </h1>
      {/* 페이지가 로딩 중일 때 로딩 메시지 표시 */}
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
            style={{ transform: `translateX(calc(-${currentIndex * 100}% + 50vw - 50%))` }}
          >
            {matchedDogs.map((dog, index) => (
              <div
                key={dog.dog_id}
                className={`dogCard ${
                  index === currentIndex
                    ? 'active'
                    : index === currentIndex - 1 || (currentIndex === 0 && index === matchedDogs.length - 1)
                    ? 'prev'
                    : index === currentIndex + 1 || (currentIndex === matchedDogs.length - 1 && index === 0)
                    ? 'next'
                    : ''
                }`}
                onClick={() => handleCardClick(dog)}
              >
                <img src={dog.information_image_url} alt={dog.information_dog_name} className="dogImage" />
                <h2>{dog.information_dog_name}</h2>
                <p className="dogCharacter">{dog.information_dog_character}</p>
                <p className="dogText">{dog.information_dog_text}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* 매칭되는 강아지가 없을 때 표시 */
        <p>No matching dogs found</p>
      )}
      <div>
        <button onClick={onClickBack}>돌아가기</button>
      </div>
    </div>
  );
};

export default WantMBTIResult;

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
        setDogInformation(informationData.data);
        setAnswers(answersData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDogInformation();
  }, []);

  // 사용자가 선택한 답변과 일치하는 강아지 정보를 가져오는 함수
  // 배열의 모든 요소가 조건을 만족한다면 조건에 맞는 요소들로 배열을 생성
  const matchedDogs = dogInformation.filter((dog) =>
    answers.some(
      (match) => match.id === dog.id && variable.every((varName) => match[varName] === Number(answer[varName]))
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
  // -50~50사이일 시 슬라이드 이동하지 않음
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

  // 뒤로가기 클릭 시, wantMBTI 페이지로 이동
  const handleClickBack = () => {
    navigate('/wantMBTI');
  };

  return (
    <div className="wantMBTIResult">
      {/* 뒤로가기 */}
      <div className="back-box" onClick={handleClickBack}>
        <img src="/images/Arrow.png" alt="back arrow" />
      </div>
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
            // 현재 인덱스에 따라 슬라이더 이동, 'translateX'로 슬라이더를 이동시키고,
            // 슬라이드의 중앙을 화면에 맞추기 위해 계산
            style={{ transform: `translateX(calc(-${currentIndex * 100}% + 50vw - 50%))` }}
          >
            {matchedDogs.map((dog, index) => (
              <div
                key={dog.id}
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
                <img src={dog.informationImageUrl} alt={dog.informationDogName} className="dogImage" />
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

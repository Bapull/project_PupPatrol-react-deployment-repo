import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/wantMBTIResult.css';

const WantMBTIResult = () => {
  const [dogInformation, setDogInformation] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const {
    state: [answer, variable],
  } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDogInformation = async () => {
      try {
        const [informationResponse, answersResponse] = await Promise.all([
          fetch('http://172.21.2.126:3001/informations'),
          fetch('http://172.21.2.126:3001/answers'),
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

  const matchedDogs = dogInformation.filter((dog) =>
    answers.some(
      (match) => match.dog_id === dog.dog_id && variable.every((varName) => match[varName] === answer[varName])
    )
  );

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % matchedDogs.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + matchedDogs.length) % matchedDogs.length);
  };

  const handleTouchStart = (event) => {
    setTouchStart(event.targetTouches[0].clientX);
  };

  const handleTouchMove = (event) => {
    setTouchEnd(event.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      handleNext();
    }

    if (touchStart - touchEnd < -50) {
      handlePrev();
    }
  };

  const onClickBack = () => {
    navigate('/wantMBTI');
  };

  return (
    <div className="wantMBTIResult">
      {dogInformation.length === 0 || answers.length === 0 ? (
        <p>Loading...</p>
      ) : matchedDogs.length > 0 ? (
        <div
          className="slider"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="slider-wrapper" style={{ transform: `translateX(-${currentIndex * 80}%)` }}>
            {matchedDogs.map((dog) => (
              <div key={dog.dog_id} className="dogCard">
                <img src={dog.information_image_url} alt={dog.information_dog_name} className="dogImage" />
                <h2>{dog.information_dog_name}</h2>
                <p>{dog.information_dog_character}</p>
                <p>{dog.information_dog_text}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No matching dogs found</p>
      )}
      <div>
        <button onClickBack={onClickBack}>돌아가기</button>
      </div>
    </div>
  );
};

export default WantMBTIResult;

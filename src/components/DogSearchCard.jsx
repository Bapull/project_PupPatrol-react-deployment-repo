import React from 'react';
import '../styles/DogSearchCard.css';

function DogSearchCard({ dog, handleClickDog }) {
  return (
    // 강아지 카드 클릭 시, handleClickDog 함수 실행
    <div className="dogSearchCard" onClick={() => handleClickDog(dog)}>
      {/* 강아지 이미지와 이름 출력 */}
      <div className="dogSearchCardImgContainer">
        <img src={dog.informationImageUrl} alt={dog.informationDogName} className="dogSearchCardImg" />
      </div>
      <p className="dogSearchCardName">{dog.informationDogName}</p>
    </div>
  );
}

export default DogSearchCard;

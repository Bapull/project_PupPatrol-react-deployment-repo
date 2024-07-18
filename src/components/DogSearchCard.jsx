import React from 'react';
import '../styles/DogSearchCard.css';

function DogSearchCard({ dog, handleClickDog }) {
  return (
    // 강아지 카드 클릭 시, handleClickDog 함수 실행
    <div className="dogSearchCard" onClick={() => handleClickDog(dog)}>
      {/* 강아지 이미지와 이름 출력 */}
      <img src={dog.information_image_url} alt={dog.information_dog_name} className="dogSearchCard_img" />
      <p className="dogSearchCard_name">{dog.information_dog_name}</p>
    </div>
  );
}

export default DogSearchCard;

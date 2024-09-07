import React from 'react';
import Image from './Image';
import '../styles/DogsCard.css';

const DogsCard = ({ dog }) => {
  if (!dog) {
    return <p>강아지 정보가 없습니다.</p>;
  }

  return (
    <div className="dogContainer">
      <div className="dog">
        <Image
          className="image"
          folder="dogs"
          fileName={dog.dogPhotoName}
          style={{ width: '200px', height: '200px' }}
        />
        <div className="dogInfo">
          <h3>{dog.dogName}</h3>
          <p>{dog.dogBreed}</p>
          <p>{dog.dogBirthDate}</p>
        </div>
      </div>
    </div>
  );
};

export default DogsCard;

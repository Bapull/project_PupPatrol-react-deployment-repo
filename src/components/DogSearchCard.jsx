import React from 'react';
import '../styles/DogSearchCard.css';

function DogSearchCard({ dog, handleDogClick }) {
  return (
    <div className="dogSearchCard" onClick={() => handleDogClick(dog)}>
      <img src={dog.information_image_url} alt={dog.information_dog_name} className="dogSearchCard_img" />
      <p className="dogSearchCard_name">{dog.information_dog_name}</p>
    </div>
  );
}

export default DogSearchCard;

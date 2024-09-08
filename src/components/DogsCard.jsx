import React from 'react';
import axios from '../lib/axios';
import { imageDeleteApi } from '../utils/fetchAPI';
import Image from './Image';
import '../styles/DogsCard.css';

const DogsCard = ({ dog, setRender }) => {
  if (!dog) {
    return <p>강아지 정보가 없습니다.</p>;
  }

  const onClickDelete = (id, photoName) => {
    imageDeleteApi('http://localhost:8000/api/imageDelete', 'dogs', photoName).then(
      axios.delete(`http://localhost:8000/api/dogs/${id}`).then(() => {
        setRender((prev) => !prev);
      })
    );
  };

  return (
    <div className="dogContainer">
      <div className="editButtons">
        <div className="updateButton">
          <img src="/images/Pencil.png" alt="Edit" />
        </div>
        <div
          className="deleteButton"
          onClick={() => onClickDelete(dog.id, dog.dogPhotoName)} // 인자를 넘겨주는 방식으로 변경
        >
          <img src="/images/Gomi.png" alt="Delete" />
        </div>
      </div>
      <div className="dog">
        <Image
          key={dog.dogPhotoName}
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

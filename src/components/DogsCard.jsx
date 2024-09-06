import react from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/auth';
import axios from '../lib/axios';
import '../styles/DogsCard.css';

const DogsCard = () => {
  const navigate = useNavigate();
  const { user } = useAuth({ middleware: 'auth' });
  const [dogs, setDogs] = useState([]);
  const [render, setRender] = useState(false); // 화면 렌더링

  // 반려견 정보를 받아와서 dogs에 저장
  useEffect(() => {
    axios.get('http://localhost:8000/api/dogs').then((response) => setDogs(response.data.data));
  }, [render]);

  const handleClickAddDog = () => {
    navigate('/addDog');
  };

  return (
    <div className="userCard">
      <div className="dogContainer">
        <h2>강아지 목록</h2>
        <div className="dogList">
          {dogs && dogs.length > 0 ? (
            dogs.map((dog) => (
              <div key={dog.id} className="dog">
                <img src={dog.dogPhotoName} className="dogPhoto" alt="dogImage" />
                <div className="dogInfo">
                  <h3>{dog.dogName}</h3>
                  <p>{dog.dogBreed}</p>
                  <p>{dog.dogBirthday}</p>
                  {/* <button onClick={() => updateDog(dog.id, dog)}>수정</button>
                  <button onClick={() => deleteDog(dog.id)}>삭제</button> */}
                </div>
              </div>
            ))
          ) : (
            <p>강아지 정보가 없습니다.</p>
          )}
          <button onClick={handleClickAddDog}>추가</button>
        </div>
      </div>
    </div>
  );
};

export default DogsCard;

/* dogName, dogBreed, dogBirthDate, dogOwnerEmail, dogPhotoName */

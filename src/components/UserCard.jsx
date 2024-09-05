import react from 'react';
import '../styles/UserCard.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

const UserCard = () => {
  const navigate = useNavigate();
  const { user, dogs, addDog, updateDog, deleteDog } = useAuth({ middleware: 'auth' });

  const handleClickAddDog = () => {
    navigate('/addDog');
  };

  return (
    <div>
      <div className="userContainer">
        <div className="userInformation">
          <div className="userName">
            <h2>이름</h2>
            <p>{user.name}</p>
          </div>
          <div className="userBirth">
            <h2>생년월일</h2>
            <p>{user.birthday}</p>
          </div>
        </div>
        <img src={user.photoName} className="userPhoto" alt="userImage" />
      </div>

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
                  <button onClick={() => updateDog(dog.id, dog)}>수정</button>
                  <button onClick={() => deleteDog(dog.id)}>삭제</button>
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

export default UserCard;

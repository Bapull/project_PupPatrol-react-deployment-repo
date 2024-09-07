import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/User.css';
import BackButton from '../components/backButton';
import DogsCard from '../components/DogsCard';
import Image from '../components/Image';
import axios from '../lib/axios';
import { useAuth } from '../hooks/auth';

const User = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { user, setUser } = useAuth({ middleware: 'auth' });

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: user?.name || '',
    birthday: user?.birthday || '',
    profile_picture: user?.profile_picture || '',
  });

  const [dogs, setDogs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:8000/api/dogs').then((response) => setDogs(response.data.data));
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % dogs.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + dogs.length) % dogs.length);
  };

  if (!user) {
    return <>로딩중...</>;
  }

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedUser({ ...editedUser, profile_picture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('name', editedUser.name);
      formData.append('birthday', editedUser.birthday);
      formData.append('profile_picture', editedUser.profile_picture);

      const response = await axios.post('http://localhost:8000/api/user', formData);
      setUser(response.data.data);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setEditedUser({
      name: user.name,
      birthday: user.birthday,
      profile_picture: user.profile_picture,
    });
    setIsEditing(false);
  };

  const handleClickAddDog = () => {
    navigate('/addDog');
  };

  return (
    <div className="user">
      <BackButton />
      <button className="logoutButton" onClick={logout}>
        logout
      </button>
      <h1 className="userTitle">Information</h1>
      <div className="userContainer">
        <div className="userInformation">
          <div className="userName">
            <h2>이름</h2>
            {isEditing ? (
              <input type="text" name="name" value={editedUser.name} onChange={handleInputChange} />
            ) : (
              <p>{user.name}</p>
            )}
          </div>
          <div className="userBirth">
            <h2>생년월일</h2>
            {isEditing ? (
              <input type="date" name="birthday" value={editedUser.birthday} onChange={handleInputChange} />
            ) : (
              <p>{user.birthday}</p>
            )}
          </div>
        </div>
        <div className="userImages">
          {isEditing ? (
            <div className="editButtons">
              <button className="saveButton" onClick={handleSave}>
                Save
              </button>
              <button className="cancelButton" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          ) : (
            <img src="/images/Pencil.png" alt="Edit" className="editButton" onClick={handleEditToggle} />
          )}
          <div className="userPhoto">
            {isEditing ? (
              <div className="photoInput">
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <img src={editedUser.profile_picture} alt="Profile Preview" className="profilePreview" />
              </div>
            ) : (
              user?.profile_picture && <Image fileName={user.profile_picture} folder={'users'} />
            )}
          </div>
        </div>
      </div>
      <div className="dogNavigation">
        <button className="prevButton" onClick={handlePrev}>
          <img src="/images/Angle Left.svg" alt="이전 강아지" />
        </button>
        <DogsCard dog={dogs[currentIndex]} />
        <button className="nextButton" onClick={handleNext}>
          <img src="/images/Angle Right.svg" alt="다음 강아지" />
        </button>
      </div>
      <button className="dogAddButton" onClick={handleClickAddDog}>
        추가
      </button>
    </div>
  );
};

export default User;

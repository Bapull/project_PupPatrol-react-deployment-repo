import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/UserInformation.css';
import BackButton from '../components/backButton';

const UserInformation = () => {
  const navigate = useNavigate();

  return (
    <div className="userInformation">
      <BackButton />
      <div className="userContainer">
        <h1>유저 정보</h1>
      </div>
      <div className="dogContainer">
        <h1>강아지 정보</h1>
      </div>
    </div>
  );
};

export default UserInformation;

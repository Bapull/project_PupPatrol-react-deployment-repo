import React from 'react';
import '../styles/User.css';
import BackButton from '../components/backButton';
import DogsCard from '../components/DogsCard';
import { useAuth } from '../hooks/auth';

const User = () => {
  const { logout } = useAuth();
  const { user } = useAuth({ middleware: 'auth' });

  if (!user) {
    return <>로딩중...</>;
  }

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
            <p>{user.name}</p>
          </div>
          <div className="userBirth">
            <h2>생년월일</h2>
            <p>{user.birthday}</p>
          </div>
        </div>
        <img src={user.photoName} className="userPhoto" alt="userImage" />
      </div>
      <DogsCard />
    </div>
  );
};

export default User;

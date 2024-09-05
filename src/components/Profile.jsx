import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";

const Profile = () => {
  const Navigate = useNavigate();

  const handleClickBack = () => {
    Navigate("/dashboard");
  };

  return (
    <div className="profile" onClick={handleClickBack}>
      <img src="/images/Profile.png" alt="Profile" />
    </div>
  );
};

export default Profile;

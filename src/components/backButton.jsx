import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/backButton.css';

const BackButton = () => {
  const Navigate = useNavigate();

  const handleClickBack = () => {
    Navigate(-1);
  };

  return (
    <div className="backButton" onClick={handleClickBack}>
      <img src="/images/Arrow.png" alt="BackArrow" />
    </div>
  );
};

export default BackButton;

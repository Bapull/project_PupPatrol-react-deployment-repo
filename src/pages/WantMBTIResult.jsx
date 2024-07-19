import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/wantMBTIResult.css';

const WantMBTIResult = () => {
  const {
    state: [answer, variable],
  } = useLocation();
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/wantMBTI');
  };

  return (
    <div className="wantMBTIResult">
      <div>
        {variable.map((item) => {
          console.log(answer[item]);
          if (answer[item]) {
            return <div>{item} 네</div>;
          } else {
            return <div>{item} 아니요</div>;
          }
        })}
        <div>
          <button onClick={onClick}>돌아가기</button>
        </div>
      </div>
    </div>
  );
};

export default WantMBTIResult;

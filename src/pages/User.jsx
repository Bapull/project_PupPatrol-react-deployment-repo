import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/User.css';
import BackButton from '../components/backButton';
import DogsCard from '../components/DogsCard';
import Image from '../components/Image';
import axios from '../lib/axios';
import { useAuth } from '../hooks/auth';
import { imageUploadApi, imageDeleteApi } from '../utils/fetchAPI';

const User = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(); // 로그아웃
  const { user } = useAuth({ middleware: 'auth' }); // 사용자 정보 상태(인증된 사용자 정보)
  const [render, setRender] = useState(false); // 렌더링 상태

  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태
  // 수정할 사용자 정보 상태 초기화
  const [editedUser, setEditedUser] = useState({
    name: user?.name || '',
    birthday: user?.birthday || '',
    profile_picture: user?.profile_picture || '',
  });
  const [image, setImage] = useState(null); // 이미지 파일 상태
  const [imageUrl, setImageUrl] = useState(''); // 이미지 URL 상태

  const [dogs, setDogs] = useState([]); // 강아지 정보 상태
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 강아지 인덱스

  // 강아지 정보 불러오기(렌더링 상태 변경 시마다 실행)
  useEffect(() => {
    axios.get('http://localhost:8000/api/dogs').then((response) => setDogs(response.data.data));
  }, [render]);

  // 다음 강아지로 이동
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % dogs.length);
  };

  // 이전 강아지로 이동
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + dogs.length) % dogs.length);
  };

  // 사용자 정보가 없을 경우 로딩 중 표시
  if (!user) {
    return <>로딩중...</>;
  }

  // 수정 모드 전환
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  // 입력 필드 변경 시 상태 업데이트
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  // 파일 선택 시 상태 업데이트
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setImageUrl(URL.createObjectURL(file));
  };

  // 수정 저장
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('_method', 'PATCH');

      // 수정되었을 경우 사용자 정보를 FormData에 추가
      if (editedUser.name) formData.append('name', editedUser.name);
      if (editedUser.birthday) formData.append('birthday', editedUser.birthday);

      // 이미지가 변경되었을 경우 처리
      if (image) {
        const imageResponse = await imageUploadApi('http://localhost:8000/api/imageUpload', 'users', image);
        formData.append('profile_picture', imageResponse.data);

        // 기존 이미지 삭제
        if (user.profile_picture) {
          await imageDeleteApi('http://localhost:8000/api/imageDelete', 'users', user.profile_picture);
        }
      }

      // 사용자 정보 업데이트 요청
      await axios.post(`http://localhost:8000/api/user-update`, formData);

      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user', error);
    }
  };

  // 수정 취소 및 초기 상태 복원
  const handleCancel = () => {
    setEditedUser({
      name: user.name,
      birthday: user.birthday,
      profile_picture: user.profile_picture,
    });
    setIsEditing(false); // 수정 모드 해제
  };

  // 추가 버튼 클릭 시 AddDog 페이지로 이동
  const handleClickAddDog = () => {
    navigate('/addDog');
  };

  return (
    <div className="user">
      <BackButton />
      {/* 로그아웃 버튼 */}
      <button className="logoutButton" onClick={logout}>
        logout
      </button>
      <h1 className="userTitle">Information</h1>
      <div className="userContainer">
        {/* 사용자 정보 */}
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
          {/* 수정 버튼 */}
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
                {image ? (
                  <img src={imageUrl} alt="Profile Preview" className="profilePreview" />
                ) : (
                  <Image fileName={user?.profile_picture} folder="users" />
                )}
              </div>
            ) : (
              <Image fileName={user?.profile_picture} folder="users" />
            )}
          </div>
        </div>
      </div>
      {/* 강아지 정보 */}
      <div className="dogNavigation">
        <button className="prevButton" onClick={handlePrev}>
          <img src="/images/Angle Left.svg" alt="이전 강아지" />
        </button>
        {/* 강아지 카드 */}
        <DogsCard dog={dogs[currentIndex]} setRender={setRender} />
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

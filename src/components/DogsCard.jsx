import React, { useState } from 'react';
import axios from '../lib/axios';
import { imageUploadApi, imageDeleteApi } from '../utils/fetchAPI';
import Image from './Image';
import '../styles/DogsCard.css';

const DogsCard = ({ dog, setRender }) => {
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태
  const [editedDog, setEditedDog] = useState({ ...dog }); // 수정할 강아지 정보 상태
  const [newImage, setNewImage] = useState(null); // 새 이미지 파일 상태

  // 강아지 정보가 없을 경우 메시지 표시
  if (!dog) {
    return <p>강아지 정보가 없습니다.</p>;
  }

  // 입력 필드 변경 시 상태 업데이트
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedDog({ ...editedDog, [name]: value }); // 수정 중인 필드 업데이트
  };

  // 파일 선택 시 상태 업데이트
  const handleFileChange = (event) => {
    setNewImage(event.target.files[0]); // 새 이미지 파일 업데이트
  };

  // 수정 모드로 전환
  const onClickUpdate = () => {
    setIsEditing(true); // 수정 모드 활성화
  };

  // 수정 취소
  const handleCancel = () => {
    setEditedDog({ ...dog });
    setNewImage(null); // 새 이미지 선택이 취소되도록 설정
    setIsEditing(false);
  };

  // 수정 저장
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('_method', 'PATCH');

      // 수정된 정보를 FormData에 추가
      Object.keys(editedDog).forEach((key) => {
        formData.append(key, editedDog[key]);
      });

      // 새 이미지가 있으면 기존 이미지 삭제 후 이미지 업로드
      if (newImage) {
        // 기존 이미지 삭제
        await imageDeleteApi('http://localhost:8000/api/imageDelete', 'dogs', dog.dogPhotoName);

        // 새로운 이미지 업로드
        const imageResponse = await imageUploadApi('http://localhost:8000/api/imageUpload', 'dogs', newImage);
        formData.append('dogPhotoName', imageResponse.data); // 새 이미지의 이름을 추가
      } else {
        formData.append('dogPhotoName', dog.dogPhotoName); // 이미지 변경 없이 기존 사진 유지
      }

      // 수정 사항 서버로 전송
      const response = await axios.post(`http://localhost:8000/api/dogs/${dog.id}`, formData);

      setRender((prev) => !prev); // 렌더링 갱신
      setIsEditing(false); // 수정 모드 해제
    } catch (error) {
      console.error('에러 발생', error);
    }
  };

  const onClickDelete = (id, photoName) => {
    imageDeleteApi('http://localhost:8000/api/imageDelete', 'dogs', photoName).then(
      axios.delete(`http://localhost:8000/api/dogs/${id}`).then(() => {
        setRender((prev) => !prev);
      })
    );
  };

  return (
    <div className="dogContainer">
      {isEditing ? (
        <div className="editMode">
          <div className="editFields">
            {/* 강아지 정보 입력 필드 */}
            <div className="editName">
              <p>Name</p>
              <input type="text" name="dogName" value={editedDog.dogName} onChange={handleInputChange} />
            </div>
            <div className="editBreed">
              <p>Breed</p>
              <input type="text" name="dogBreed" value={editedDog.dogBreed} onChange={handleInputChange} />
            </div>
            <div className="editBirthDate">
              <p>Birth Date</p>
              <input type="date" name="dogBirthDate" value={editedDog.dogBirthDate} onChange={handleInputChange} />
            </div>

            {/* 이미지 미리보기 및 파일 업로드 */}
            <div className="imagePreview">
              <input type="file" accept="image/*" onChange={handleFileChange} />
              <Image className="image" folder="dogs" fileName={dog.dogPhotoName} />
            </div>
          </div>
          {/* 수정 버튼 및 취소 */}
          <div className="editButtons">
            <button className="dogEditSaveButton" onClick={handleSave}>
              Save
            </button>
            <button className="dogEditCancelButton" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="viewMode">
          <div className="editButtons">
            <div className="updateButton" onClick={onClickUpdate}>
              <img src="/images/Pencil.png" alt="Edit" />
            </div>
            <div className="deleteButton" onClick={() => onClickDelete(dog.id, dog.dogPhotoName)}>
              <img src="/images/Gomi.png" alt="Delete" />
            </div>
          </div>
          {/* 강아지 정보 */}
          <div className="dog">
            <Image key={dog.dogPhotoName} className="image" folder="dogs" fileName={dog.dogPhotoName} />
            <div className="dogInformation">
              <h3>{dog.dogName}</h3>
              <p>{dog.dogBreed}</p>
              <p>{dog.dogBirthDate}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DogsCard;

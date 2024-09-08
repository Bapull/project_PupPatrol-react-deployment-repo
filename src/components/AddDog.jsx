import React, { useState } from 'react';
import axios from '../lib/axios';
import '../styles/AddDog.css';
import BackButton from './backButton';
import { imageUploadApi } from '../utils/fetchAPI';

const AddDog = () => {
  // 강아지 정보 입력 필드 상태 초기화
  const [inputs, setInputs] = useState({
    dogName: '',
    dogBreed: '',
    dogBirthDate: '',
  });

  const [image, setImage] = useState(null); // 이미지 파일 상태
  const [render, setRender] = useState(false); // 렌더링 상태

  // 입력 필드 변경 시 상태 업데이트
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  // 이미지 파일 선택 시 상태 업데이트
  const handleImageChange = (event) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
    }
  };

  // 강아지 정보 제출 함수
  const handleSubmit = async () => {
    // 사진 선택 여부 확인
    if (!image) {
      return alert('사진을 선택해주세요');
    }

    try {
      const formData = new FormData();
      // 이미지 업로드 API 호출하여 업로드 된 파일명을 반환
      const imageResponse = await imageUploadApi('http://localhost:8000/api/imageUpload', 'dogs', image);
      formData.append('dogPhotoName', imageResponse.data); // 이미지 파일 추가

      // 입력 필드 값을 FormData에 추가
      Object.keys(inputs).forEach((key) => {
        if (inputs[key] !== '') {
          formData.append(key, inputs[key]);
        }
      });

      // 강아지 정보 서버로 전송
      await axios.post('http://localhost:8000/api/dogs', formData);

      setRender((prev) => !prev);
    } catch (error) {
      console.error('Error adding data', error);
    }
  };

  return (
    <div className="addDog">
      <BackButton /> {/* 뒤로가기 버튼 */}
      <div className="addDogContainer">
        {/* 강아지 이름 입력 필드 */}
        <label className="dogName">강아지 이름</label>
        <input name="dogName" type="text" value={inputs.dogName} onChange={handleChange} />

        {/* 강아지 종 입력 필드 */}
        <label className="dogBreed">강아지 종</label>
        <input name="dogBreed" type="text" value={inputs.dogBreed} onChange={handleChange} />

        {/* 강아지 생일 입력 필드 */}
        <label className="dogBirthDate">강아지 생일</label>
        <input name="dogBirthDate" type="date" value={inputs.dogBirthDate} onChange={handleChange} />

        {/* 강아지 사진 파일 선택 */}
        <label className="dogImage">강아지 사진</label>
        <input name="dogImage" type="file" accept="image/*" onChange={handleImageChange} />

        {/* 강아지 정보 제출 버튼 */}
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddDog;

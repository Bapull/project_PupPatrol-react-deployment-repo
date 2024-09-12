import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../lib/axios';
import '../styles/AddDog.css';
import BackButton from './backButton';
import { imageUploadApi } from '../utils/fetchAPI';

const AddDog = () => {
  const navigate = useNavigate();
  // 강아지 정보 입력 필드 상태 초기화
  const [inputs, setInputs] = useState({
    dogName: '',
    dogBreed: '',
    dogBirthDate: '',
  });

  const [image, setImage] = useState(null); // 이미지 파일 상태
  const [previewImage, setPreviewImage] = useState(null); // 이미지 미리보기 상태
  const [render, setRender] = useState(false); // 렌더링 상태
  const [step, setStep] = useState(1); // 입력 단계 상태

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
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  // 다음 단계로 넘어가는 함수
  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1);
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
      alert('강아지 정보가 성공적으로 추가되었습니다.');

      navigate('/user'); // 사용자 페이지로 이동
    } catch (error) {
      console.error('Error adding data', error);
    }
  };

  return (
    <div className="addDog">
      <BackButton /> {/* 뒤로가기 버튼 */}
      <div className="addDogContainer">
        {/* 강아지 이름 입력 필드 */}
        {step === 1 && (
          <>
            <label className="dogName">나의 반려견 이름을 알려주세요</label>
            <input name="dogName" type="text" value={inputs.dogName} onChange={handleChange} />
            <button type="button" className="inputNextButton" onClick={handleNextStep}>
              Next
            </button>
          </>
        )}

        {/* 강아지 종 입력 필드 */}
        {step === 2 && (
          <>
            <label className="dogBreed">{inputs.dogName}(이)는 어떤 친구인가요?</label>
            <input name="dogBreed" type="text" value={inputs.dogBreed} onChange={handleChange} />
            <button type="button" className="inputNextButton" onClick={handleNextStep}>
              Next
            </button>
          </>
        )}

        {/* 강아지 생일 입력 필드 */}
        {step === 3 && (
          <>
            <label className="dogBirthDate">{inputs.dogName}(이)의 생일은 언제인가요?</label>
            <input name="dogBirthDate" type="date" value={inputs.dogBirthDate} onChange={handleChange} />
            <button type="button" className="inputNextButton" onClick={handleNextStep}>
              Next
            </button>
          </>
        )}

        {/* 강아지 사진 파일 선택 */}
        {step === 4 && (
          <>
            <div className="dogImageInput">
              <label className="dogImage">{inputs.dogName}(이)의 모습을 보여주세요!</label>
              <input name="dogImage" type="file" accept="image/*" onChange={handleImageChange} />

              {/* 이미지 미리보기 */}
              {previewImage && <img src={previewImage} alt={`${inputs.dogName} 미리보기`} className="previewImage" />}

              {/* 강아지 정보 제출 버튼 */}
              <button type="button" className="submitButton" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddDog;

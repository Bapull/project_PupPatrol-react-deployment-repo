import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DogSearch.css';
import DogSearchCard from '../components/DogSearchCard';
import BackButton from '../components/backButton';

function DogSearch() {
  // dogs: 전체 강아지 정보, search: 검색어, filteredDogs: 검색된 강아지 정보
  const [dogs, setDogs] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredDogs, setFilteredDogs] = useState([]);
  // currentPage: 현재 페이지, inputRef: 검색어 입력창 ref
  const [currentPage, setCurrentPage] = useState(1);
  const inputRef = useRef(null);
  // navigate: 페이지 이동 함수, itemsPerPage : 페이지당 보여줄 강아지 수
  const navigate = useNavigate();
  const itemsPerPage = 6;

  // 컴포넌트가 렌더링된 후, 서버로부터 강아지 정보를 받아옴
  useEffect(() => {
    fetch('http://localhost:3001/informations')
      .then((response) => response.json())
      .then((data) => {
        setDogs(data.data);
        setFilteredDogs(data.data);
      });
  }, []);

  // 컴포넌트가 렌더링된 후, 검색어 입력창에 포커스
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // 검색어가 변경될 때, 검색된 강아지 정보를 업데이트
  useEffect(() => {
    const filtered = dogs.filter((dog) => dog.informationDogName.includes(search));
    setFilteredDogs(filtered);
    setCurrentPage(1); // 검색어가 변경될 때 페이지를 초기화
  }, [search, dogs]);

  // 강아지 카드 클릭 시, wantDogDescription 페이지로 이동
  const handleClickDog = (dog) => {
    navigate('/wantDogDescription', { state: { dog } });
  };

  // 다음 페이지로 이동
  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredDogs.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // 이전 페이지로 이동
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // startIndex: 현재 페이지의 첫 번째 인덱스, currentDogs: 현재 페이지의 강아지 정보
  // totalPages: 전체 페이지 수
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDogs = filteredDogs.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredDogs.length / itemsPerPage);

  return (
    <div className="dogSearch">
      {/* 뒤로가기 버튼 */}
      <BackButton />
      <h1>Dog Search</h1>
      {/* 검색어 입력창 */}
      <div className="dogSearch_search-box">
        <input
          // 검색어 입력창 ref, placeholder, value, onChange 이벤트 함수 설정
          ref={inputRef}
          type="text"
          placeholder="Select Dog Type"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
      {/* 강아지 카드 목록 */}
      <div className="dogSearch_results">
        {/* 강아지 정보를 담은 DogSearchCard 컴포넌트를 렌더링 */}
        {currentDogs.map((dog, index) => (
          <DogSearchCard key={index} dog={dog} handleClickDog={handleClickDog} />
        ))}
      </div>
      {/* 페이지네이션 */}
      <div className="dogSearch_pagination">
        {/* 현재 페이지가 1보다 크면 이전 페이지로 이동하는 버튼을 렌더링 */}
        {currentPage > 1 && <button onClick={handlePrevPage}>Prev</button>}
        {/* 현재 페이지가 전체 페이지 수보다 작으면 다음 페이지로 이동하는 버튼을 렌더링 */}
        {currentPage < totalPages && <button onClick={handleNextPage}>Next</button>}
      </div>
    </div>
  );
}

export default DogSearch;

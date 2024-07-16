import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DogSearch.css';
import DogSearchCard from '../components/DogSearchCard';

function DogSearch() {
  const [dogs, setDogs] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredDogs, setFilteredDogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [expand, setExpand] = useState(true);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const itemsPerPage = 6;

  useEffect(() => {
    fetch('http://172.21.2.126:3001/informations')
      .then((response) => response.json())
      .then((data) => {
        setDogs(data);
        setFilteredDogs(data);
      });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setExpand(false);
      inputRef.current.focus();
    }, 300);
  }, []);

  useEffect(() => {
    const filtered = dogs.filter((dog) => dog.information_dog_name.includes(search));
    setFilteredDogs(filtered);
    setCurrentPage(1); // 검색어가 변경될 때 페이지를 초기화
  }, [search, dogs]);

  const handleClickBack = () => {
    setExpand(true);
    setTimeout(() => {
      navigate('/wantSelect');
    }, 300);
  };

  const handleClickDog = (dog) => {
    navigate('/wantDogDescription', { state: { dog } });
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredDogs.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDogs = filteredDogs.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredDogs.length / itemsPerPage);

  return (
    <div className="dogSearch">
      <div className="back-box" onClick={handleClickBack}>
        <img src="/images/Arrow.png" alt="back arrow" />
      </div>
      <h1>Dog Search</h1>
      <div className={`dogSearch_search-box ${expand ? 'expand' : ''}`}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Select Dog Type"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
      <div className="dogSearch_results">
        {currentDogs.map((dog, index) => (
          <DogSearchCard key={index} dog={dog} handleClickDog={handleClickDog} />
        ))}
      </div>
      <div className="dogSearch_pagination">
        {currentPage > 1 && <button onClick={handlePrevPage}>Prev</button>}
        {currentPage < totalPages && <button onClick={handleNextPage}>Next</button>}
      </div>
    </div>
  );
}

export default DogSearch;

// 강아지 종 검색 및 선택 페이지
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DogSearch.css';

function DogSearch() {
  const [dogs, setDogs] = useState([]);
  const [search, setSearch] = useState('');
  const [expand, setExpand] = useState(true);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    fetch('http://192.168.0.13:3001/informations')
      .then((response) => response.json())
      .then((data) => setDogs(data));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setExpand(false);
      inputRef.current.focus();
    }, 300);
  }, []);

  const filteredDogs = dogs.filter((dog) => dog.information_dog_name.toLowerCase().includes(search.toLowerCase()));

  const handleClick = () => {
    setExpand(true);
    setTimeout(() => {
      navigate('/wantSelect');
    }, 300);
  };

  const handleDogClick = (dog) => {
    navigate('/wantDogDescription', { state: { dog } });
  };

  return (
    <div className="dogSearch">
      <div className="back-box" onClick={handleClick}>
        <h1>Back</h1>
      </div>
      <h1>Dog Search</h1>
      <div className={`dogSearch_search-box ${expand ? 'expand' : ''} transition`}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Select Dog Type"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
      <div className="dogSearch_results">
        {filteredDogs.slice(0, 6).map((dog) => (
          <div
            key={dog.information_dog_name}
            className="dogSearch_item"
            onClick={() => handleDogClick(dog.information_dog_name)}
          >
            <img src={`${dog.information_image_url}`} alt={dog.information_dog_name} />
            <p>{dog.information_dog_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DogSearch;

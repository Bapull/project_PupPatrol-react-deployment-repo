// 강아지 종 검색 및 선택 페이지
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/DogSearch.css';

function DogSearch() {
  const [dogs, setDogs] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('http://192.168.0.13:3001/informations')
      .then((response) => response.json())
      .then((data) => setDogs(data));
  }, []);

  const filteredDogs = dogs.filter((dog) => dog.information_dog_name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="dogSearch">
      <Link to="/wantSelect" className="back-link">
        <div className="back-box">
          <h1>Back</h1>
        </div>
      </Link>
      <h1>Dog Search</h1>
      <div className="dogSearch_search-box">
        <input
          type="text"
          placeholder="Select Dog Type"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
      <div className="dogSearch_results">
        {filteredDogs.slice(0, 6).map((dog) => (
          <div key={dog.information_dog_name} className="dogSearch_item">
            <img src={`${dog.information_image_url}`} alt={dog.information_dog_name} />
            <p>{dog.information_dog_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DogSearch;

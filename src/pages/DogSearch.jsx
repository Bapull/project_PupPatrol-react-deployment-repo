import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DogSearch.css';
import DogSearchCard from '../components/DogSearchCard';

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
        {filteredDogs.slice(0, 6).map((dog) => (
          <DogSearchCard key={dog.information_dog_name} dog={dog} handleDogClick={handleDogClick} />
        ))}
      </div>
    </div>
  );
}

export default DogSearch;

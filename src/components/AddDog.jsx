import react from 'react';
import '../styles/AddDog.css';
import { useAuth } from '../hooks/auth';

const AddDog = () => {
  const { addDog } = useAuth({ middleware: 'auth' });

  return (
    <div className="addDog">
      <h1>강아지 추가</h1>
      <form onSubmit={addDog}>
        <input type="text" name="dogName" placeholder="강아지 이름" />
        <input type="text" name="dogBreed" placeholder="강아지 종" />
        <input type="date" name="dogBirthDate" placeholder="강아지 생일" />
        <input type="file" name="dogPhoto" />
        <button type="submit">추가</button>
      </form>
    </div>
  );
};

export default AddDog;

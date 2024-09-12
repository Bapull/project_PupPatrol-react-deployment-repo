import { BrowserView, MobileView } from 'react-device-detect';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CategorySelect from './pages/CategorySelect';
import DogSearch from './pages/DogSearch';
import Login from './pages/Login';
import User from './pages/User';
import AddDog from './components/AddDog';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import WantDogDescription from './pages/WantDogDescription';
import WantMBTI from './pages/WantMBTI';
import WantMBTIResult from './pages/WantMBTIResult';
import WantSelect from './pages/WantSelect';
import ImageTest from './test/ImageTest';
import { ApiProvider } from './contexts/ApiContext';
import TipsTest from './test/TipsTest'
import TipsListTest from './test/TipsListTest'
import TipsDetail from './test/TipsDetail'
import TipsUpdateTest from './test/TipsUpdateTest'

import './App.css';

import AnswerCrudTest from './test/AnswerCrudTest';
import DogsCrudTest from './test/DogsCrudTest';
import BoardTest from './test/BoardTest';
import PrintTest from './test/PrintTest';
import BoardUpdateTest from './test/BoardUpdateTest';
import BoardListTest from './test/BoardListTest';
import AdminPage from './pages/AdminPage';
import AnswerInformation from './components/AnswerInformation';
import BoardCreate from './pages/board/BoardCreate';
import BoardList from './pages/board/BoardList';
import BoardDescription from './pages/board/BoardDescription';
import BoardUpdate from './pages/board/BoardUpdate';
import UserUpdate from './test/UserUpdate';

function App() {
  return (
    <ApiProvider>
      <Router>
        <BrowserView></BrowserView>
        <MobileView></MobileView>
        <Routes>
          <Route path="/" element={<Navigate to="/categorySelect" />} />
          <Route path="/categorySelect/*" element={<CategorySelect />} />
          <Route path="/dogSearch" element={<DogSearch />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<User />} />
          <Route path="/addDog" element={<AddDog />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/wantDogDescription" element={<WantDogDescription />} />
          <Route path="/wantMBTI" element={<WantMBTI />} />
          <Route path="/wantMBTIResult" element={<WantMBTIResult />} />
          <Route path="/wantSelect" element={<WantSelect />} />
          <Route path="/admin-page" element={<AdminPage />} />
          <Route path="/answer-information-page" element={<AnswerInformation />} />
            
          <Route path="/image-test" element={<ImageTest />} />
          <Route path="/answer-test" element={<AnswerCrudTest />} />
          <Route path="/dog-test" element={<DogsCrudTest />} />
          <Route path="/board-test" element={<BoardTest />} />
          <Route path="/list-test" element={<BoardListTest />} />
          <Route path="/print-test" element={<PrintTest />} />
          <Route path="/board-update-test" element={<BoardUpdateTest />} />
          <Route path="/boardCreate" element={<BoardCreate />} />
          <Route path="/boardList" element={<BoardList />} />
          <Route path="/boardDescription" element={<BoardDescription />} />
          <Route path="/boardUpdate" element={<BoardUpdate />} />
          <Route path="/user-update" element={<UserUpdate />} />
          <Route path="/tips-test" element={<TipsTest />} />
          <Route path="/tipsList-test" element={<TipsListTest />} />
          <Route path="/tips-detail" element={<TipsDetail />} />
          <Route path="/tips-update-test" element={<TipsUpdateTest />} />
        </Routes>
      </Router>
    </ApiProvider>
  );
}

export default App;

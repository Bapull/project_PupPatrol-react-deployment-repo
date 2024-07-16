import { BrowserView, MobileView } from 'react-device-detect';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import WantSelect from './pages/WantSelect';
import WantMBTI from './pages/WantMBTI';
import DogSearch from './pages/DogSearch';
import CategorySelect from "./pages/CategorySelect";
import WantDogDescription from './pages/WantDogDescription';
import './App.css';
import WantMBTI from './pages/WantMBTI';
import { Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import WantMBTIResult from './pages/WantMBTIResult';
function App() {
  return (
    <Router>
      <div className="App">
        <BrowserView></BrowserView>
        <MobileView></MobileView>
        <Routes>
          <Route path="/" element={<Navigate to="/categorySelect" />} />
          <Route path="/categorySelect" element={<CategorySelect />} />
          <Route path="/wantSelect" element={<WantSelect />} />
          <Route path="/wantMBTI" element={<WantMBTI />} />
          <Route path="/dogSearch" element={<DogSearch />} />
          <Route path="/wantDogDescription" element={<WantDogDescription />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

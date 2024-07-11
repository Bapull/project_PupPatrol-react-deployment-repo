import { BrowserView, MobileView } from 'react-device-detect';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import WantSelect from './pages/WantSelect';
import WantMBTI from './pages/WantMBTI';
import DogSearch from './pages/DogSearch';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <BrowserView></BrowserView>
        <MobileView></MobileView>
        <Routes>
          <Route path="/" element={<Navigate to="/wantSelect" />} />
          <Route path="/wantSelect" element={<WantSelect />} />
          <Route path="/wantMBTI" element={<WantMBTI />} />
          <Route path="/dogSearch" element={<DogSearch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

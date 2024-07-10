import { BrowserView, MobileView } from 'react-device-detect';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import WantSelect from './pages/WantSelect';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>멍비티아이</h1>
        <BrowserView>
          <div>
            <Link to="/wantSelect">Go to Want Select Page</Link>
          </div>
        </BrowserView>
        <MobileView>
          <div>
            <Link to="/wantSelect">Go to Want Select Page</Link>
          </div>
        </MobileView>
        <Routes>
          <Route path="/wantSelect" element={<WantSelect />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

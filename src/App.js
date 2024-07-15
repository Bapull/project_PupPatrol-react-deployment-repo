import { useEffect, useState } from 'react';
import './App.css';
import WantMBTI from './pages/WantMBTI';
import { Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import WantMBTIResult from './pages/WantMBTIResult';
function App() {
  const [info,setInfo] = useState([]);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/wantMBTI" element={<WantMBTI></WantMBTI>}/>
        <Route path="/wantMBTIresult" element={<WantMBTIResult></WantMBTIResult>}></Route>        
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserView, MobileView } from "react-device-detect";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import WantSelect from "./pages/WantSelect";
import WantMBTI from "./pages/WantMBTI";
import DogSearch from "./pages/DogSearch";
import CategorySelect from "./pages/CategorySelect";
import WantDogDescription from "./pages/WantDogDescription";
import WantMBTIResult from "./pages/WantMBTIResult";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Personal from "./pages/Personal";

function App() {
  return (
    <Router>
      <BrowserView></BrowserView>
      <MobileView></MobileView>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/Personal" element={<Personal />}/>
        <Route path="/categorySelect/*" element={<CategorySelect />} />
        <Route path="/wantSelect" element={<WantSelect />} />
        <Route path="/wantMBTI" element={<WantMBTI />} />
        <Route path="/dogSearch" element={<DogSearch />} />
        <Route path="/wantDogDescription" element={<WantDogDescription />} />
        <Route path="/wantMBTIResult" element={<WantMBTIResult />} />
      </Routes>
    </Router>
  );
}

export default App;

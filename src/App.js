import { BrowserView, MobileView } from "react-device-detect";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import CategorySelect from "./pages/CategorySelect";
import DogSearch from "./pages/DogSearch";
import Login from "./pages/Login";
import Personal from "./pages/Personal";
import Register from "./pages/Register";
import WantDogDescription from "./pages/WantDogDescription";
import WantMBTI from "./pages/WantMBTI";
import WantMBTIResult from "./pages/WantMBTIResult";
import WantSelect from "./pages/WantSelect";
import ImageTest from './pages/ImageTest'
import { ApiProvider } from "./contexts/ApiContext";
import "./App.css";

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
          <Route path="/personal" element={<Personal />} />
          <Route path="/register" element={<Register />} />
          <Route path="/wantDogDescription" element={<WantDogDescription />} />
          <Route path="/wantMBTI" element={<WantMBTI />} />
          <Route path="/wantMBTIResult" element={<WantMBTIResult />} />
          <Route path="/wantSelect" element={<WantSelect />} />
          <Route path="/image" element={<ImageTest/>}/>
        </Routes>
      </Router>
    </ApiProvider>
  );
}

export default App;

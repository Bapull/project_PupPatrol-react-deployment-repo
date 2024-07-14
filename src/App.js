import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { BrowserView, MobileView } from "react-device-detect";
import CategorySelect from "./pages/CategorySelect";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <BrowserView></BrowserView>
          <MobileView></MobileView>
          <BrowserView></BrowserView>
          <MobileView></MobileView>
        </nav>
        <Routes>
          <Route path="/categorySelect" element={<CategorySelect />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { BrowserView, MobileView } from "react-device-detect";
import Home from "./Home";
import CategorySelect from "./pages/CategorySelect";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <BrowserView>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/categorySelect">Category Select</Link>
              </li>
            </ul>
          </BrowserView>
          <MobileView>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/categorySelect">Category Select</Link>
              </li>
            </ul>
          </MobileView>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categorySelect" element={<CategorySelect />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

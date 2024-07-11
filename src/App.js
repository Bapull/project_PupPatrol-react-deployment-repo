import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { BrowserView, MobileView } from "react-device-detect";
import Home from "./Home";
import CategorySelect from "./pages/CategorySelectLeft";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <BrowserView></BrowserView>
          <MobileView></MobileView>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categorySelectLeft" element={<CategorySelect />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

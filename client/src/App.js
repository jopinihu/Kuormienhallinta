import React from "react";
import "./style.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/LogIn";
import Button from "react-bootstrap/Button";
import Navbar from "./components/Navbar";
import Table from "./components/Table";
import AddingLoad from "./components/AddingLoad";
import Error from "./pages/Error";

function App() {
  return (
    <div className="bg_image">
      <div className="main-div">
        <Navbar />
        <Router>
          <div className="movingbuttons">
            <Link to="/Table">
              {" "}
              <Button>Taulukko</Button>{" "}
            </Link>
            <Link to="/AddingLoad">
              {" "}
              <Button>Lisää kuorma</Button>{" "}
            </Link>
          </div>

          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/Table" element={<Table />} />
            <Route path="/AddingLoad" element={<AddingLoad />} />
            <Route path="/update/:id" element={<AddingLoad />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;

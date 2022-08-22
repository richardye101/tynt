import React from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HomePage from "./components/homePage";
import NavBar from "./components/navBar";
import NotFound from "./components/notFound";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Outflows from "./components/outflows/outflows";

function App() {
  return (
    <>
      <ToastContainer />
      <NavBar />
      {/* <p>Hello</p> */}
      <div className="container">
        <Routes>
          <Route path="/outflows" element={<Outflows />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

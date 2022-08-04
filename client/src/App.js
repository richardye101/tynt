import React from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import NavBar from "./components/navBar";

function App() {
  return (
    <>
      <ToastContainer />
      <NavBar />
      <div className="container">
        {/* <Routes> */}
        {/* <Route path="/" element={<HomePage />} /> */}
        {/* <Route path="*" element={<Navigate />} /> */}
        {/* </Routes> */}
      </div>
    </>
  );
}

export default App;

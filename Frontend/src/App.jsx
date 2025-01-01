import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navigationbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/MyFooter";
import { ToastContainer } from "react-toastify";
import Reports from "./pages/Reports";
import Contact from "./pages/Contact";
const App = () => {
  return (
    <>
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/report" element={<Reports />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;

import React from "react";
 import ReactDOM from 'react-dom'
import "./App.css";
import Header from "./components/Header/Header.js";
import Footer from "./components/Footer/Footer.jsx";
import Content from "./components/Content/Content.js";
import  Profile from "./components/Profile/Profile.js";
import NavbarR from "./components/NavbarR/NavbarR";

function App() {
  return (
    <div className="App">
      <NavbarR />
      <Content />
      <Footer />
      <Profile/>
    </div>
  );
}

export default App;

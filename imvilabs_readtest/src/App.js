import React from "react";
import Header from "./components/Header/Header.js";
import Footer from "./components/Footer/Footer.jsx";
import Content from "./components/Content/Content.js";
import NavbarR from "./components/NavbarR/NavbarR";


function App() {
  return (
    <div className="App">
      <NavbarR />
      <Content />
    </div>
  );
}

export default App;

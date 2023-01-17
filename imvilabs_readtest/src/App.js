import React from 'react'
import ReactDOM from 'react-dom'
import "./App.css";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Content from "./components/Content/Content.js"
import Profile from "./components/Profile/Profile.js"

function App() {
  return (
    <div className="App">
      <Header />
      <Content />
      <Profile/>
      <Footer />
    </div>
  );
}

export default App;

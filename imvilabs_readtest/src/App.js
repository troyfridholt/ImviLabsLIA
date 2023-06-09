import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Content from './components/Content/Content';
import Profile from './components/Profile/Profile';
import Settings from './components/Profile/Settings'
import Verify from './components/Content/Verify';

function App() {

  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/profile/:uid" element={<Profile/>} />
        <Route path="/settings/:uid" element={<Settings/>} />
        <Route path="/verify" element={<Verify/>} />
      </Routes>
    </Router>
  );
}

export default App;

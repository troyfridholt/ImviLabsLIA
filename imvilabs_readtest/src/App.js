import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Content from './components/Content/Content';
import Profile from './components/Profile/Profile';
import Settings from './components/Profile/Settings'

function App() {

  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/profile/:email" element={<Profile/>} />
        <Route path="/settings/:email" element={<Settings/>} />
      </Routes>
    </Router>
  );
}

export default App;

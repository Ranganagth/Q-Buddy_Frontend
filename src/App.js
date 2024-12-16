import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './signIn';
import SignUp from './signUp';
import HomePage from './home';
import "leaflet/dist/leaflet.css";
import DashboardLayoutSlots from './components/DashboardLayoutSlots.tsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/dashboard' element={<DashboardLayoutSlots />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;

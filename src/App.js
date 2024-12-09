import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './signIn';
import SignUp from './signUp';
import HomePage from './home';

function App() {
  const [location, setLocation] = useState({ latitude: 51.505, longitude: -0.09 }); 

  const handleSaveLocation = (latitude, longitude) => {
    setLocation({ latitude, longitude });
    console.log("Updated location:", { latitude, longitude });
  };

  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route  path="/home" element={<HomePage />} />
        <Route path="/" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;

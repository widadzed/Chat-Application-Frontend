import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Navigate } from 'react-router-dom';

import { Auth, Chat } from 'src/pages';
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [currentUsername, setCurrentUsername] = useState()
  return (
  <Router>
    <Routes>
      <Route path="/auth" element={<Auth 
      setLoggedIn={setLoggedIn}
      setToken={setToken}
      setCurrentUser={setCurrentUser}
      setCurrentUsername={setCurrentUsername}
      />} />
      <Route path="/chat" element={loggedIn ? <Chat token={token} currentUser={currentUser} currentUsername={currentUsername}/> : <Navigate to="/auth" />} />
      <Route path="*" element={<Navigate to={loggedIn ? "/chat" : "/auth"} />} />
    </Routes>
  </Router>
  );
}

export default App;

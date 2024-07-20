// src/App.js
import React, { useState, useEffect } from "react";
import HomePage from "./components/HomePage";
import AppointmentsList from "./components/appointments/AppointmentsList";
import axios from 'axios';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    try {
      const logSesionesCod = localStorage.getItem('logSesionesCod');
      const logAccionesCod = localStorage.getItem('logAccionesCod');
      
      await axios.post('http://localhost:8080/api/logout', { logSesionesCod, logAccionesCod });
      
      localStorage.removeItem('user');
      localStorage.removeItem('logSesionesCod');
      localStorage.removeItem('logAccionesCod');
      setUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-t from-cyan-900 to-slate-300">
      {isLoggedIn ? (
        <div className="flex flex-col">
          <button 
              onClick={handleLogout}
              className="absolute mt-20 ml-5 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Cerrar sesión
            </button>
          <AppointmentsList user={user} />
        </div>
      ) : (
        <HomePage onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};

export default App;
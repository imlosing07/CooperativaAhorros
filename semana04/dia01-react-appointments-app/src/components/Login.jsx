import React, { useState } from "react";
import axios from 'axios';

const LoginForm = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/login', {
        usuUsu: username,
        usuPas: password,
        disCod: 1
      });
      
      if (response.data.success) {
        localStorage.setItem('user', JSON.stringify(response.data.usuario));
        localStorage.setItem('logSesionesCod', response.data.logSesionesCod);
        localStorage.setItem('logAccionesCod', response.data.logAccionesCod);
        onLoginSuccess(response.data.usuario);
      } else {
        setError("Credenciales inválidas");
      }
    } catch (error) {
      setError("Error al iniciar sesión");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center" 
         style={{backgroundImage: "url('https://www.stelorder.com/wp-content/uploads/2021/09/portada-sociedad-cooperativa-1.jpg')"}}>
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-2xl rounded-lg px-12 pt-6 pb-8 mb-4 transform transition duration-500 hover:scale-105">
          <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">Login</h1>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 transform hover:scale-105"
              type="submit"
            >
              Sign In
            </button>
          </div>
          {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
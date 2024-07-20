import React, { useState } from 'react';
import LoginModal from './LoginModal';
import { FaChartLine, FaHandshake, FaPiggyBank } from 'react-icons/fa';

const HomePage = ({ onLoginSuccess }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const features = [
    { icon: <FaChartLine />, title: 'Crecimiento Financiero', description: 'Estrategias personalizadas para maximizar tus ahorros.' },
    { icon: <FaHandshake />, title: 'Atención Personalizada', description: 'Asesores dedicados a tu éxito financiero.' },
    { icon: <FaPiggyBank />, title: 'Ahorro Inteligente', description: 'Herramientas innovadoras para gestionar tu dinero.' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex-shrink-0 flex items-center">
              <img className="h-12 w-auto" src="https://proyase.net/wp-content/uploads/2019/12/2-20191202-SOCIEDAD-COOPERATIVA-1386x693.png" alt="Logo" />
            </div>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">Servicios</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">Nosotros</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">Contacto</a>
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
              >
                Iniciar sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero section */}
      <main className="flex-grow flex flex-col items-center justify-center text-white px-4 py-20 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg shadow-lg">
        <h1 className="text-5xl font-bold mb-6 text-center leading-tight drop-shadow-md">Bienvenido a Cooperativa Ahorro</h1>
        <p className="text-xl mb-12 text-center max-w-2xl">
          Somos una cooperativa comprometida con el crecimiento financiero de nuestros socios.
          Ofrecemos soluciones innovadoras y personalizadas para ayudarte a alcanzar tus metas económicas.
        </p>
        <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105 shadow-md">
          Comenzar ahora
        </button>
      </main>

      {/* Features section */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Nuestros Servicios</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105">
                <div className="text-5xl text-teal-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <p>&copy; 2024 Cooperativa Ahorro. Todos los derechos reservados.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-teal-400">Términos</a>
            <a href="#" className="hover:text-teal-400">Privacidad</a>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={onLoginSuccess}
      />
    </div>
  );
};

export default HomePage;

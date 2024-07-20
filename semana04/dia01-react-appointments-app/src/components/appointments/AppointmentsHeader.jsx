import React from 'react';

const AppointmentsHeader = ({ title, onTableSelect }) => {
  const handleTableSelect = (tableName) => {
    onTableSelect(tableName);
  };

  return (
    <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 mb-5 dark:bg-gray-800">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <a href="#" className="flex items-center">
          <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">{title}</span>
        </a>
        <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="additional-menu">
          <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            <li className="relative group">
              <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Gestion Cooperativa</a>
              <ul className="absolute hidden group-hover:block bg-gray-800 text-white py-2 mt-0 w-48">
                <li><a href="#" className="block px-4 py-2 hover:bg-gray-200 hover:text-gray-800" onClick={() => handleTableSelect('cooperativa')}>Cooperativa</a></li>
                <li><a href="#" className="block px-4 py-2 hover:bg-gray-200 hover:text-gray-800" onClick={() => handleTableSelect('socio')}>Socios</a></li>
                <li><a href="#" className="block px-4 py-2 hover:bg-gray-200 hover:text-gray-800" onClick={() => handleTableSelect('cuenta')}>Cuentas</a></li>
                <li><a href="#" className="block px-4 py-2 hover:bg-gray-200 hover:text-gray-800" onClick={() => handleTableSelect('direccion')}>Direcciones</a></li>
                <li><a href="#" className="block px-4 py-2 hover:bg-gray-200 hover:text-gray-800" onClick={() => handleTableSelect('persona')}>Personas</a></li>
              </ul>
            </li>
            <li className="relative group">
              <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Gestion Usuarios</a>
              <ul className="absolute hidden group-hover:block bg-gray-800 text-white py-2 mt-0 w-40">
                <li><a href="#" className="block px-4 py-2 hover:bg-gray-200 hover:text-gray-800" onClick={() => handleTableSelect('usuario')}>Usuarios</a></li>
                <li><a href="#" className="block px-4 py-2 hover:bg-gray-200 hover:text-gray-800" onClick={() => handleTableSelect('rol')}>Roles</a></li>
                <li><a href="#" className="block px-4 py-2 hover:bg-gray-200 hover:text-gray-800" onClick={() => handleTableSelect('dispositivo')}>Dispositivos</a></li>
                <li><a href="#" className="block px-4 py-2 hover:bg-gray-200 hover:text-gray-800" onClick={() => handleTableSelect('logSesiones')}>Log Sesiones</a></li>
                <li><a href="#" className="block px-4 py-2 hover:bg-gray-200 hover:text-gray-800" onClick={() => handleTableSelect('logAcciones')}>Log Acciones</a></li>
                <li><a href="#" className="block px-4 py-2 hover:bg-gray-200 hover:text-gray-800" onClick={() => handleTableSelect('accion')}>Acciones</a></li>
              </ul>
            </li>
            <li className="relative group">
              <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Mesa de Ayuda</a>
              <ul className="absolute hidden group-hover:block bg-gray-800 text-white py-2 mt-0 w-40">
                <li><a href="#" className="block px-4 py-2 hover:bg-gray-200 hover:text-gray-800" onClick={() => handleTableSelect('ticketAyuda')}>Ticket Ayuda</a></li>
                <li><a href="#" className="block px-4 py-2 hover:bg-gray-200 hover:text-gray-800" onClick={() => handleTableSelect('area')}>Areas Servicio</a></li>
                <li><a href="#" className="block px-4 py-2 hover:bg-gray-200 hover:text-gray-800" onClick={() => handleTableSelect('solucion')}>Soluciones</a></li>
                <li><a href="#" className="block px-4 py-2 hover:bg-gray-200 hover:text-gray-800" onClick={() => handleTableSelect('avance')}>Avances</a></li>
              </ul>
            </li>
            <li className="relative group">
              <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Cargos y Funciones</a>
              <ul className="absolute hidden group-hover:block bg-gray-800 text-white py-2 mt-0 w-40">
                <li><a href="#" className="block px-4 py-2 hover:bg-gray-200 hover:text-gray-800" onClick={() => handleTableSelect('cargo')}>Cargos</a></li>
                <li><a href="#" className="block px-4 py-2 hover:bg-gray-200 hover:text-gray-800" onClick={() => handleTableSelect('manual')}>Manuales</a></li>
                <li><a href="#" className="block px-4 py-2 hover:bg-gray-200 hover:text-gray-800" onClick={() => handleTableSelect('funciones')}>Funciones</a></li>
              </ul>
            </li>
            <li className="relative group">
              <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Gestion Productos</a>
              <ul className="absolute hidden group-hover:block bg-gray-800 text-white py-2 mt-0 w-40">
                <li><a href="#" className="block px-4 py-2 hover:bg-gray-200 hover:text-gray-800" onClick={() => handleTableSelect('producto')}>Productos</a></li>
                <li><a href="#" className="block px-4 py-2 hover:bg-gray-200 hover:text-gray-800" onClick={() => handleTableSelect('moneda')}>Monedas</a></li>
                <li><a href="#" className="block px-4 py-2 hover:bg-gray-200 hover:text-gray-800" onClick={() => handleTableSelect('tasa')}>Tasas</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AppointmentsHeader;
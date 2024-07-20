import React, { useState, useEffect } from 'react';
import { fetchCodesWithAxios } from '../../services/Appointment';

const LogSesionesForm = ({ appointment, onSaveAppointment, isEditing, nextId }) => {

  const [form, setForm] = useState({
    dia: '',
    usuario: '',
    dispositivo: '',
    logSesionEst: 'A'
  });

  const [usuarioCodes, setUsuarioCodes] = useState([]);
  const [dispositivoCodes, setDispositivoCodes] = useState([]);

  useEffect(() => {
    if (isEditing && appointment) {
      console.log('appointment:', appointment);
        setForm(appointment);
    } else {
        setForm(prev => ({ ...prev, logSesionesEst: 'A' }));
    }
}, [isEditing, appointment]);

  useEffect(() => {
    const fetchUsuariosCodes = async () => {
      try {
        const codes1 = await fetchCodesWithAxios("usuario");
        console.log('Usuarios:', codes1);
        setUsuarioCodes(codes1);
      } catch (error) {
        console.error('Error fetching usuarios codes:', error);
      }
    };
    const fetchDispositivoCodes = async () => {
      try {
        const codes2 = await fetchCodesWithAxios("dispositivo");
        console.log('Dispositivos:', codes2);
        setDispositivoCodes(codes2);
      } catch (error) {
        console.error('Error fetching devices:', error);
      }
    }

    fetchUsuariosCodes();
    fetchDispositivoCodes();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log('form:', form);
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSaveAppointment(form, !isEditing);
};

  return (
    <form className="max-w-sm mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
      {isEditing ? (
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">ID</label>
          <input
            type="text"
            value={appointment.logSesionCod}
            className="shadow-sm bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            disabled
          />
        </div>
      ) : (
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Próximo ID</label>
          <input
            type="text"
            value={nextId}
            className="shadow-sm bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            disabled
          />
        </div>
      )}
      <div className="mb-5">
        <label htmlFor="dia" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Dia</label>
        <input
          type="date"
          id="dia"
          name="dia"
          value={form.dia}
          onChange={handleChange}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <div className="mb-5">
        <label htmlFor="dispositivo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Select Dispositivo</label>
        <select
          id="dispositivo"
          name="dispositivo"
          value={form.dispositivo}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">Select a Dispositive</option>
          {Object.entries(dispositivoCodes).map(([code, name]) => (
            <option key={code} value={code}>{name}</option>
          ))}
        </select>
      </div>
      <div className="mb-5">
        <label htmlFor="usuario" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Select Usuario</label>
        <select
          id="usuario"
          name="usuario"
          value={form.usuario}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">Select a usuario</option>
          {Object.entries(usuarioCodes).map(([code, name]) => (
            <option key={code} value={code}>{name}</option>
          ))}
        </select>
      </div>
      <div className="mb-5">
        <label htmlFor="logSesionEst" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Estado</label>
        <select
          id="logSesionEst"
          name="logSesionEst"
          value={form.logSesionEst}
          onChange={handleChange}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        >
          <option value="A">Activo</option>
          <option value="I">Inactivo</option>
        </select>
      </div>
      <button
        type="submit"
        className="transition duration-300 ease-in-out transform hover:scale-105 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {isEditing ? 'Modificar' : 'Crear'} Log Sesion
      </button>
    </form>
  );
};

export default LogSesionesForm;

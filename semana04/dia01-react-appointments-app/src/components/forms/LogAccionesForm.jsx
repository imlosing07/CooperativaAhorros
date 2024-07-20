import React, { useState, useEffect } from 'react';
import { fetchCodesWithAxios } from '../../services/Appointment';

const LogAccionesForm = ({ appointment, onSaveAppointment, isEditing, nextId }) => {
  const [form, setForm] = useState({
    logSesionesCod: '',
    horaFin: '',
    logAccionEst: '',
  });
  const [sessionCodes, setSessionCodes] = useState([]);

  useEffect(() => {
    if (isEditing && appointment) {
      setForm(appointment);
    } else {
      setForm(prev => ({ ...prev, logAccionEst: 'A' }));
    }
  }, [isEditing, appointment]);


  useEffect(() => {
    const fetchSessionCodes = async () => {
      try {
        const codes = await fetchCodesWithAxios("logSesiones");
        setSessionCodes(codes);
      } catch (error) {
        console.error('Error fetching session codes:', error);
      }
    };

    fetchSessionCodes();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
  
    // Asegurarse de que horaFin esté en el formato "HH:mm:ss"
    if (name === "horaFin" && value) {
      const [hours, minutes] = value.split(":");
      const formattedTime = `${hours}:${minutes}:00`;
      setForm({ ...form, [name]: formattedTime });
    } else {
      setForm({ ...form, [name]: value });
    }
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
            value={appointment.logAccionCod}
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
        <label htmlFor="logSesionesCod" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Select Session Code</label>
        <select
          id="logSesionesCod"
          name="logSesionesCod"
          value={form.logSesionesCod}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">Select a session code</option>
          {sessionCodes.map((code) => (
            <option key={code} value={code}>Seccion: {code}</option>
          ))}
        </select>
      </div>
      <div className="mb-5">
        <label htmlFor="horaFin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">LogAccion Hora fin</label>
        <input
          type="time"
          id="horaFin"
          name="horaFin"
          value={form.horaFin}
          onChange={handleChange}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <div className="mb-5">
        <label htmlFor="logAccionEst" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Estado</label>
        <select
          id="logAccionEst"
          name="logAccionEst"
          value={form.logAccionEst}
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
        {isEditing ? 'Modificar' : 'Crear'} Log Accion
      </button>
    </form>
  );
};

export default LogAccionesForm;

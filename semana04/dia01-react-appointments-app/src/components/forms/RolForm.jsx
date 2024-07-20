import React, { useState, useEffect } from 'react';

const RolForm = ({ appointment, onSaveAppointment, isEditing, nextId }) => {
  const [form, setForm] = useState({
    rolRol: '',
    rolNom: '',
    rolEst: 'A'
  });

  useEffect(() => {
    if (isEditing && appointment) {
      setForm(appointment);
    } else {
      setForm(prev => ({ ...prev, cooEst: 'A' }));
    }
  }, [isEditing, appointment]);

  const handleChange = (event) => {
    const { name, value } = event.target;
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
            value={appointment.rolCod}
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
        <label htmlFor="rolRol" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Codigo interno</label>
        <input
          type="text"
          id="rolRol"
          name="rolRol"
          value={form.rolRol}
          onChange={handleChange}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <div className="mb-5">
        <label htmlFor="rolNom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nombre</label>
        <input
          type="text"
          id="rolNom"
          name="rolNom"
          value={form.rolNom}
          onChange={handleChange}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <div className="mb-5">
        <label htmlFor="rolEst" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Estado</label>
        <select
          id="rolEst"
          name="rolEst"
          value={form.rolEst}
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
        {isEditing ? 'Modificar' : 'Crear'} Rol
      </button>
    </form>
  );
};

export default RolForm;
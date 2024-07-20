import React, { useState, useEffect } from 'react';

const MonedaForm = ({ appointment, onSaveAppointment }) => {
  const [form, setForm] = useState({
    monNom: '',
    monEst: '',
  });

  useEffect(() => {
    if (appointment) {
      setForm(appointment);
    }
  }, [appointment]);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form:', form);
    console.log('Appointment:', appointment);
    onSaveAppointment(form, !appointment);
  };

  return (
    <form className="max-w-sm mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>

      <div className="mb-5">
        <label htmlFor="monNom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Denominacion "nombre"</label>
        <input
          type="text"
          id="monNom"
          name="monNom"
          value={form.monNom}
          onChange={handleChange}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <div className="mb-5 grid grid-cols-1 grid-rows-2 gap-6 place-items-center">
        <div>
          <label htmlFor="accEst" className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Action Status:
          </label>
          <span className="ml-2 text-lg font-semibold text-blue-600 dark:text-blue-400">
            A
          </span>
        </div>
        <button
          type="submit"
          className="transition duration-300 ease-in-out transform hover:scale-105 mx-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Registrar Moneda
        </button>
      </div>
    </form>
  );
};

export default MonedaForm;
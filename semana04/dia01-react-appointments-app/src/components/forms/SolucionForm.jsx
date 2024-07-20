import React, { useState, useEffect } from 'react';

const SolucionForm = ({ appointment, onSaveAppointment }) => {
  const [form, setForm] = useState({
    solNom : '',
    solDes: '',
    solFec: '',
    solEst: ''
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
        <label htmlFor="solNom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nombre de la solucion</label>
        <input
          type="text"
          id="solNom"
          name="solNom"
          value={form.solNom}
          onChange={handleChange}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <div className="mb-5">
        <label htmlFor="solDes" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Descripcion</label>
        <textarea
          name="solDes"
          onChange={handleChange}
          id="solDes"
          value={form.solDes}
          rows="4"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="Descripcion de solucion"
        ></textarea>
      </div>
      <div className="mb-5">
        <label htmlFor="solFec" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Fecha de solucion</label>
        <input
          type="date"
          id="solFec"
          name="solFec"
          value={form.solFec}
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
          Guardar Solucion
        </button>
      </div>
    </form>
  );
};

export default SolucionForm;
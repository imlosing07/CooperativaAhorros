import React, { useState, useEffect } from 'react';
import { fetchCodesWithAxios } from '../../services/Appointment';

const FuncionesForm = ({ appointment, onSaveAppointment }) => {
  const [form, setForm] = useState({
    funDes: '',
    funReq: '',
    manuales: [],
    funEst: ''
  });
  const [manualesCodes, setManualesCodes] = useState([]);

  useEffect(() => {
    if (appointment) {
      setForm(appointment);
    }
  }, [appointment]);

  useEffect(() => {
    const fetchManualesCodes = async () => {
      try {
        const code2 = await fetchCodesWithAxios("manual");
        console.log('Manuales:', code2);
        setManualesCodes(code2);
      } catch (error) {
        console.error('Error fetching manuales:', error);
      }
    }

    fetchManualesCodes();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleManualesChange = (e) => {
    const selectedOption = e.target.value;
    const selectedName = manualesCodes[selectedOption];
    if (!form.manuales.some(manual => manual.code === selectedOption)) {
      setForm(prevForm => ({
        ...prevForm,
        manuales: [...prevForm.manuales, { code: selectedOption, name: selectedName }]
      }));
    }
  };

  const removeManual = (manualToRemove) => {
    setForm(prevForm => ({
      ...prevForm,
      manuales: prevForm.manuales.filter(manual => manual.code !== manualToRemove)
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const manualesKeys = form.manuales.map(manual => manual.code);
    onSaveAppointment({ ...form, manuales: manualesKeys }, !appointment);
  };

  return (
    <form className="max-w-sm mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
      <div className="mb-5">
        <label htmlFor="manuales" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Select manuales</label>
        <select
          id="manuales"
          name="manuales"
          onChange={handleManualesChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="" disabled>Select a manual</option>
          {Object.entries(manualesCodes).map(([code, name]) => (
            <option key={code} value={code}>{name}</option>
          ))}
        </select>
      </div>
      <div className="mb-5">
        {form.manuales.map(manual => (
          <div key={manual.code} className="flex items-center mb-2">
            <span className="text-gray-900 dark:text-gray-300">{manual.name}</span>
            <button
              type="button"
              onClick={() => removeManual(manual.code)}
              className="ml-2 text-red-600 dark:text-red-400"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      <div className="mb-5">
        <label htmlFor="funDes" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Funcion Description</label>
        <textarea
          name="funDes"
          onChange={handleChange}
          id="funDes"
          value={form.funDes}
          rows="4"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="Descripcion de accion"
        ></textarea>
      </div>
      <div className="mb-5">
        <label htmlFor="funReq" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Funcion Requisito</label>
        <input
          type="text"
          id="funReq"
          name="funReq"
          value={form.funReq}
          onChange={handleChange}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <div className="mb-5">
        <label htmlFor="funEst" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Funcion Status</label>
        <input
          type="text"
          id="funEst"
          name="funEst"
          value={form.funEst}
          onChange={handleChange}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        className="mx-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Guardar Funcion
      </button>
    </form>
  );
};

export default FuncionesForm;

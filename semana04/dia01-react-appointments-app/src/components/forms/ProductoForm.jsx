import React, { useState, useEffect } from 'react';
import { fetchCodesWithAxios } from '../../services/Appointment';

const ProductoForm = ({ appointment, onSaveAppointment }) => {
  const [form, setForm] = useState({
    proIden: '',
    proDes: '',
    tasa: '',
    moneda: '',
    socio: '',
    proEst: ''
  });
  const [tasasCodes, setTasasCodes] = useState([]);
  const [monedasCodes, setMonedasCodes] = useState([]);
  const [sociosCodes, setSociosCodes] = useState([]);

  useEffect(() => {
    if (appointment) {
      setForm(appointment);
    }
  }, [appointment]);

  useEffect(() => {
    const fetchTasasCodes = async () => {
      try {
        const codes = await fetchCodesWithAxios("tasa");
        setTasasCodes(codes);
      } catch (error) {
        console.error('Error fetching tasas codes:', error);
      }
    };

    const fetchMonedasCodes = async () => {
      try {
        const codes = await fetchCodesWithAxios("moneda");
        setMonedasCodes(codes);
      } catch (error) {
        console.error('Error fetching monedas codes:', error);
      }
    }

    const fetchSociosCodes = async () => {
      try {
        const codes = await fetchCodesWithAxios("socio");
        setSociosCodes(codes);
      } catch (error) {
        console.error('Error fetching socios codes:', error);
      }
    }

    fetchTasasCodes();
    fetchMonedasCodes();
    fetchSociosCodes();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const generateProIden = () => {
    const moneda = form.moneda ? form.moneda.charAt(0).toUpperCase() : '';
    const tasa = form.tasa ? form.tasa.replace(/\D/g, '') : '';
    return `${moneda}${tasa}-${Date.now()}`;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const proIden = generateProIden();
    console.log('Form:', { ...form, proIden });
    console.log('Appointment:', appointment);
    onSaveAppointment({ ...form, proIden }, !appointment);
  };

  return (
    <form className="max-w-sm mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
      <div className='grid grid-cols-2 gap-4'>
        <div className="mb-5">
          <label htmlFor="proDes" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Descripcion</label>
          <textarea
            name="proDes"
            onChange={handleChange}
            id="proDes"
            value={form.proDes}
            rows="4"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Descripcion del producto"
          ></textarea>
        </div>
        <div className="mb-5">
          <label htmlFor="tasa" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Select Tasa</label>
          <select
            id="tasa"
            name="tasa"
            value={form.tasa}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Select tasa...</option>
            {Object.entries(tasasCodes).map(([code, name]) => (
              <option key={code} value={code}>{name}</option>
            ))}
          </select>
        </div>
        <div className="mb-5">
          <label htmlFor="moneda" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Select Moneda</label>
          <select
            id="moneda"
            name="moneda"
            value={form.moneda}
            onChange={handleChange}
            multiple
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {Object.entries(monedasCodes).map(([code, name]) => (
              <option key={code} value={code}>{name}</option>
            ))}
          </select>
        </div>
        <div className="mb-5">
          <label htmlFor="socio" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Select Socio</label>
          <select
            id="socio"
            name="socio"
            value={form.socio}
            onChange={handleChange}
            multiple
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {Object.entries(sociosCodes).map(([code, name]) => (
              <option key={code} value={code}>{name}</option>
            ))}
          </select>
        </div>
      </div>
        <div className="mb-5 flex items-center w-40">
          <label htmlFor="proEst" className="text-sm font-medium text-gray-900 dark:text-gray-300 mr-2">Estado del Producto</label>
          <input
            type="text"
            id="proEst"
            name="proEst"
            value={form.proEst}
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
      <button
        type="submit"
        className="mx-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Registrar Producto
      </button>
    </form>
  );
};

export default ProductoForm;
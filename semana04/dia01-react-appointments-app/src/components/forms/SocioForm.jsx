import React, { useState, useEffect } from 'react';
import { fetchCodesWithAxios } from '../../services/Appointment';

const SocioForm = ({ appointment, onSaveAppointment, isEditing, nextId }) => {
    const [form, setForm] = useState({
        socIden: '',
        socApePat: '',
        socApeMat: '',
        socNom: '',
        socioFec: '',
        socCor: '',
        cooperativa: '',
        direccion: '',
        cuenta: '',
        socEst: 'A',
    });

    const [cooperativaCodes, setCooperativaCodes] = useState([]);
    const [cuentaCodes, setCuentaCodes] = useState([]);
    const [direccionCodes, setDireccionCodes] = useState([]);


    useEffect(() => {
        if (isEditing && appointment) {
            setForm(appointment);
        } else {
            setForm(prev => ({ ...prev, socEst: 'A' }));
        }
    }, [isEditing, appointment]);

    useEffect(() => {
        const fetchCooperativaCodes = async () => {
            try {
                const codes = await fetchCodesWithAxios("cooperativa");
                console.log('Cooperativas:', codes);
                setCooperativaCodes(codes);
            } catch (error) {
                console.error('Error fetching cooperativa codes:', error);
            }
        };
        const fetchCuentaCodes = async () => {
            try {
                const codes = await fetchCodesWithAxios("cuenta");
                console.log('Cuentas:', codes);
                setCuentaCodes(codes);
            } catch (error) {
                console.error('Error fetching devices:', error);
            }
        }
        const fetchDireccionCodes = async () => {
            try {
                const codes = await fetchCodesWithAxios("direccion");
                console.log('Direcciones:', codes);
                setDireccionCodes(codes);
            } catch (error) {
                console.error('Error fetching devices:', error);
            }
        }

        fetchCooperativaCodes();
        fetchCuentaCodes();
        fetchDireccionCodes();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSaveAppointment(form, !isEditing);
    };

    const today = new Date();
    const minAgeDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    const maxDate = minAgeDate.toISOString().split('T')[0];

    return (
        <form className="flex flex-col items-center max-w-sm mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
            {isEditing ? (
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">ID</label>
                    <input
                        type="text"
                        value={appointment.socCod}
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
            <div className='grid grid-cols-2 gap-3'>
                <div className="mb-5">
                    <label htmlFor="socIden" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Identificacion</label>
                    <input
                        type="text"
                        id="socIden"
                        name="socIden"
                        value={form.socIden}
                        onChange={handleChange}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="socApePat" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Apellido Paterno</label>
                    <input
                        type="text"
                        id="socApePat"
                        name="socApePat"
                        value={form.socApePat}
                        onChange={handleChange}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="socApeMat" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Apellido Materno</label>
                    <input
                        type="text"
                        id="socApeMat"
                        name="socApeMat"
                        value={form.socApeMat}
                        onChange={handleChange}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="socNom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nombre(s)</label>
                    <input
                        type="text"
                        id="socNom"
                        name="socNom"
                        value={form.socNom}
                        onChange={handleChange}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="socioFec" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Fecha Nacimiento
                    </label>
                    <input
                        type="date"
                        id="socioFec"
                        name="socioFec"
                        value={form.socioFec}
                        onChange={handleChange}
                        max={maxDate}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="socCor" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Correo</label>
                    <input
                        type="email"
                        id="socCor"
                        name="socCor"
                        value={form.socCor}
                        onChange={handleChange}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="cooperativa" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Select Cooperativa</label>
                    <select
                        id="cooperativa"
                        name="cooperativa"
                        value={form.cooperativa}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value="" className='hover'>Select a Cooperativa</option>
                        {Object.entries(cooperativaCodes).map(([code, name]) => (
                            <option key={code} value={code}>{name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-5">
                    <label htmlFor="direccion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Select Direccion</label>
                    <select
                        id="direccion"
                        name="direccion"
                        value={form.direccion}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value="" className='hover'>Select a Direccion</option>
                        {Object.entries(direccionCodes).map(([code, name]) => (
                            <option key={code} value={code}>{name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-5">
                    <label htmlFor="cuenta" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Select Cuenta</label>
                    <select
                        id="cuenta"
                        name="cuenta"
                        value={form.cuenta}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value="" className='hover'>Select a Cuenta</option>
                        {Object.entries(cuentaCodes).map(([code, name]) => (
                            <option key={code} value={code}>{name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="mb-5">
                <label htmlFor="socEst" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Estado</label>
                <select
                    id="socEst"
                    name="socEst"
                    value={form.socEst}
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
                {isEditing ? 'Modificar' : 'Crear'} Socio
            </button>
        </form>
    );
};

export default SocioForm;
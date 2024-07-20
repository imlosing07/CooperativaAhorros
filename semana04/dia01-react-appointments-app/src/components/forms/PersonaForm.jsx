import React, { useState, useEffect } from 'react';
import { fetchCodesWithAxios } from '../../services/Appointment';

const PersonaForm = ({ appointment, onSaveAppointment, isEditing, nextId }) => {
    const [form, setForm] = useState({
        perApePat: '',
        perApeMat: '',
        perNom: '',
        perFecNac: '',
        perCor: '',
        perFot: '',
        cooperativa: '',
        cargo: '',
        perEst: 'A',
    });

    const [cooperativaCodes, setCooperativaCodes] = useState([]);
    const [cargoCodes, setCargoCodes] = useState([]);


    useEffect(() => {
        if (isEditing && appointment) {
            setForm(appointment);
        } else {
            setForm(prev => ({ ...prev, cooEst: 'A' }));
        }
    }, [isEditing, appointment]);

    useEffect(() => {
        const fetchCooperativaCodes = async () => {
            try {
                const codes = await fetchCodesWithAxios("cooperativa");

                console.log('Cooperativas codes:', codes);
                setCooperativaCodes(codes);
            } catch (error) {
                console.error('Error fetching cooperativas codes:', error);
            }
        };
        const fetchCargoCodes = async () => {
            try {
                const codes = await fetchCodesWithAxios("cargo");

                console.log('Cargo codes:', codes);
                setCargoCodes(codes);
            } catch (error) {
                console.error('Error fetching cooperativas codes:', error);
            }
        };
        fetchCooperativaCodes();
        fetchCargoCodes();
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
                        value={appointment.cooCod}
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
                    <label htmlFor="perApePat" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Apellido Paterno</label>
                    <input
                        type="text"
                        id="perApePat"
                        name="perApePat"
                        value={form.perApePat}
                        onChange={handleChange}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="perApeMat" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Apellido Materno</label>
                    <input
                        type="text"
                        id="perApeMat"
                        name="perApeMat"
                        value={form.perApeMat}
                        onChange={handleChange}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="perNom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nombre(s)</label>
                    <input
                        type="text"
                        id="perNom"
                        name="perNom"
                        value={form.perNom}
                        onChange={handleChange}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="perFecNac" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Fecha Nacimiento
                    </label>
                    <input
                        type="date"
                        id="perFecNac"
                        name="perFecNac"
                        value={form.perFecNac}
                        onChange={handleChange}
                        max={maxDate}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="perCor" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Correo</label>
                    <input
                        type="email"
                        id="perCor"
                        name="perCor"
                        value={form.perCor}
                        onChange={handleChange}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="perFot" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Foto</label>
                    <input
                        type="text"
                        id="perFot"
                        name="perFot"
                        value={form.perFot}
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
                    <label htmlFor="cargo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Select Cargo</label>
                    <select
                        id="cargo"
                        name="cargo"
                        value={form.cargo}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value="" className='hover'>Select a Cargo</option>
                        {Object.entries(cargoCodes).map(([code, name]) => (
                            <option key={code} value={code}>{name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="mb-5">
                <label htmlFor="perEst" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Estado</label>
                <select
                    id="perEst"
                    name="perEst"
                    value={form.perEst}
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
                {isEditing ? 'Modificar' : 'Crear'} Persona
            </button>
        </form>
    );
};

export default PersonaForm;
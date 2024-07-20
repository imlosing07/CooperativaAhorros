import React, { useState, useEffect } from 'react';
import { fetchCodesWithAxios } from '../../services/Appointment';

const UsuarioForm = ({ appointment, onSaveAppointment, isEditing, nextId }) => {
    const [form, setForm] = useState({
        usuIde: '',
        usuUsu: '',
        usuPas: '',
        cooperativa: '',
        rol: '',
        usuEst: 'A',
    });

    const [cooperativaCodes, setCooperativaCodes] = useState([]);
    const [rolesCodes, setRolesCodes] = useState([]);

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
        const fetchRolesCodes = async () => {
            try {
                const codes = await fetchCodesWithAxios("rol");
                console.log('Roles codes:', codes);
                setRolesCodes(codes);
            } catch (error) {
                console.error('Error fetching roles codes:', error);
            }
        };
        fetchCooperativaCodes();
        fetchRolesCodes();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSaveAppointment(form, !isEditing);
    };

    return (
        <form className="flex flex-col items-center max-w-sm mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
            {isEditing ? (
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">ID</label>
                    <input
                        type="text"
                        value={appointment.usuCod}
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
                    <label htmlFor="usuIde" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Identificacion</label>
                    <input
                        type="text"
                        id="usuIde"
                        name="usuIde"
                        value={form.usuIde}
                        onChange={handleChange}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="usuUsu" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nombre(s)</label>
                    <input
                        type="text"
                        id="usuUsu"
                        name="usuUsu"
                        value={form.usuUsu}
                        onChange={handleChange}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="usuPas" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nombre(s)</label>
                    <input
                        type="password"
                        id="usuPas"
                        name="usuPas"
                        value={form.usuPas}
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
                        <option value="">Select a Cooperativa</option>
                        {Object.entries(cooperativaCodes).map(([code, name]) => (
                            <option key={code} value={code}>{name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-5">
                    <label htmlFor="rol" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Select Rol</label>
                    <select
                        id="rol"
                        name="rol"
                        value={form.rol}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value="">Select a Rol</option>
                        {Object.entries(rolesCodes).map(([code, name]) => (
                            <option key={code} value={code}>{name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="mb-5">
                <label htmlFor="usuEst" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Estado</label>
                <select
                    id="usuEst"
                    name="usuEst"
                    value={form.usuEst}
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
                {isEditing ? 'Modificar' : 'Crear'} Usuario
            </button>
        </form>
    );
};

export default UsuarioForm;
import React, { useState, useEffect } from 'react';

const CooperativaForm = ({ appointment, onSaveAppointment, isEditing, nextId }) => {
    const [form, setForm] = useState({
        cooIden: '',
        cooNom: '',
        cooSig: '',
        cooDir: '',
        cooTel: '',
        cooCor: '',
        cooSlo: '',
        cooLog: '',
        cooEst: 'A',
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

    const handleTelChange = (event) => {
        const { name, value } = event.target;
        if (value.length <= 9) {
            setForm({ ...form, [name]: value });
        }
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
                    <label htmlFor="cooIden" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Identificacion</label>
                    <input
                        type="text"
                        id="cooIden"
                        name="cooIden"
                        value={form.cooIden}
                        onChange={handleChange}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="cooNom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Cooperativa Nombre</label>
                    <input
                        type="text"
                        id="cooNom"
                        name="cooNom"
                        value={form.cooNom}
                        onChange={handleChange}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="cooSig" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Cooperativa Siglas</label>
                    <input
                        type="text"
                        id="cooSig"
                        name="cooSig"
                        value={form.cooSig}
                        onChange={handleChange}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="cooDir" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Cooperativa Direccion</label>
                    <input
                        type="text"
                        id="cooDir"
                        name="cooDir"
                        value={form.cooDir}
                        onChange={handleChange}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="cooTel" className="block text-sm font-medium text-gray-300 mb-2">Cooperativa Teléfono</label>
                    <input
                        type="tel"
                        id="cooTel"
                        name="cooTel"
                        pattern="[0-9]{9}"
                        maxLength="9"
                        value={form.cooTel}
                        onChange={handleTelChange}
                        placeholder="Ingrese 9 dígitos"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="cooCor" className="block text-sm font-medium text-gray-300 mb-2">Cooperativa Correo</label>
                    <input
                        type="email"
                        id="cooCor"
                        name="cooCor"
                        value={form.cooCor}
                        onChange={handleChange}
                        list="emailOptions"
                        placeholder="ejemplo@dominio.com"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                    <datalist id="emailOptions">
                        <option value="@gmail.com" />
                        <option value="@outlook.com" />
                        <option value="@hotmail.com" />
                        <option value="@yahoo.com" />
                    </datalist>
                </div>
                <div className="mb-5">
                    <label htmlFor="cooSlo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Cooperativa Slogan</label>
                    <input
                        type="text"
                        id="cooSlo"
                        name="cooSlo"
                        value={form.cooSlo}
                        onChange={handleChange}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="cooLog" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Cooperativa Logo</label>
                    <input
                        type="text"
                        id="cooLog"
                        name="cooLog"
                        value={form.cooLog}
                        onChange={handleChange}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
            </div>
            <div className="mb-5">
                <label htmlFor="cooEst" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Estado</label>
                <select
                    id="cooEst"
                    name="cooEst"
                    value={form.cooEst}
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
                {isEditing ? 'Modificar' : 'Crear'} Cooperativa
            </button>
        </form>
    );
};

export default CooperativaForm;
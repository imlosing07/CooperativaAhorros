import React, { useState, useEffect } from 'react';

const TasaForm = ({ appointment, onSaveAppointment }) => {
    const [form, setForm] = useState({
        tasTasa: '',
        tasDesc: '',
        tasPlaDia: '',
        tasFecIni: '',
        tasFecFin: '',
        tasEst: ''
    });

    useEffect(() => {
        if (appointment) {
            setForm(appointment);
        }
    }, [appointment]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: name === 'tasTasa' ? parseFloat(value) : value
        }));
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
                <label htmlFor="tasDesc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Descripcion</label>
                <textarea
                    name="tasDesc"
                    onChange={handleChange}
                    id="tasDesc"
                    value={form.tasDesc}
                    rows="4"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="Descripcion de la tasa"
                ></textarea>
            </div>
            <div className="mb-5">
                <label htmlFor="tasTasa" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tasa pactada</label>
                <input
                    type="number"
                    id="tasTasa"
                    name="tasTasa"
                    value={form.tasTasa}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    max="100"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                />
            </div>
            <div className="mb-5">
                <label htmlFor="tasFecIni" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Fecha Inicio</label>
                <input
                    type="date"
                    id="tasFecIni"
                    name="tasFecIni"
                    value={form.tasFecIni}
                    onChange={handleChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                />
            </div>
            <div className="mb-5">
                <label htmlFor="tasFecFin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Fecha Fin</label>
                <input
                    type="date"
                    id="tasFecFin"
                    name="tasFecFin"
                    value={form.tasFecFin}
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
                    Registrar Tasa
                </button>
            </div>
        </form>
    );
};

export default TasaForm;
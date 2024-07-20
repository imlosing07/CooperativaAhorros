import React, { useState, useEffect } from 'react';
import { fetchCodesWithAxios } from '../../services/Appointment';

const TicketAyudaForm = ({ appointment, onSaveAppointment }) => {
    const [form, setForm] = useState({
        descripcion: '',
        fechaCreacion: '',
        tipSer: '',
        usuario: '',
        areCod: '',
        soluciones: [],
        estCod: ''
    });
    const [usuarioCodes, setUsuarioCodes] = useState([]);
    const [areasCodes, setAreasCodes] = useState([]);
    const [solucionesCodes, setSolucionesCodes] = useState([]);

    useEffect(() => {
        if (appointment) {
            setForm(appointment);
        }
    }, [appointment]);

    useEffect(() => {
        const fetchUsuariosCodes = async () => {
            try {
                const codes = await fetchCodesWithAxios("usuario");
                console.log('Usuarios:', codes);
                setUsuarioCodes(codes);
            } catch (error) {
                console.error('Error fetching usuarios codes:', error);
            }
        };
        const fetchAreasCodes = async () => {
            try {
                const codes = await fetchCodesWithAxios("area");
                setAreasCodes(codes);
            } catch (error) {
                console.error('Error fetching devices:', error);
            }
        }
        const fetchSolucionesCodes = async () => {
            try {
                const codes = await fetchCodesWithAxios("solucion");
                setSolucionesCodes(codes);
            } catch (error) {
                console.error('Error fetching devices:', error);
            }
        }

        fetchUsuariosCodes();
        fetchAreasCodes();
        fetchSolucionesCodes();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const handleSolucionesChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setForm(prevForm => ({
            ...prevForm,
            soluciones: selectedOptions
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
                <label htmlFor="descripcion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Descripcion</label>
                <textarea
                    name="descripcion"
                    onChange={handleChange}
                    id="descripcion"
                    value={form.descripcion}
                    rows="4"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="Descripcion del ticket"
                ></textarea>
            </div>
            <div className="mb-5">
                <label htmlFor="fechaCreacion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Fecha de creacion</label>
                <input
                    type="date"
                    id="fechaCreacion"
                    name="fechaCreacion"
                    value={form.fechaCreacion}
                    onChange={handleChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                />
            </div>
            <div className="mb-5">
                <label htmlFor="tipSer" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tipo de servicio</label>
                <select
                    id="tipSer"
                    name="tipSer"
                    value={form.tipSer}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option value="">Consulta</option>
                    <option value="">Reclamo</option>
                    <option value="">Sugerencia</option>
                </select>
            </div>
            <div className="mb-5">
                <label htmlFor="usuario" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Select usuario</label>
                <select
                    id="usuario"
                    name="usuario"
                    value={form.usuario}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option value="">Select usuario...</option>
                    {Object.entries(usuarioCodes).map(([code, name]) => (
                            <option key={code} value={code}>{name}</option>
                        ))}
                </select>
            </div>
            <div className="mb-5">
                <label htmlFor="areCod" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Select area</label>
                <select
                    id="areCod"
                    name="areCod"
                    value={form.areCod}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option value="">Select area...</option>
                    {Object.entries(areasCodes).map(([code, name]) => (
                            <option key={code} value={code}>{name}</option>
                        ))}
                </select>
            </div>
            <div className="mb-5">
                <label htmlFor="soluciones" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Select soluciones</label>
                <select
                    id="soluciones"
                    name="soluciones"
                    value={form.soluciones}
                    onChange={handleSolucionesChange}
                    multiple
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    {Object.entries(solucionesCodes).map(([code, name]) => (
                            <option key={code} value={code}>{name}</option>
                        ))}
                </select>
            </div>
            <div className="mb-5">
                <label htmlFor="estCod" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Estado del Ticket</label>
                <input
                    type="text"
                    id="estCod"
                    name="estCod"
                    value={form.estCod}
                    onChange={handleChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                />
            </div>
            <button
                type="submit"
                className="mx-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Registrar Ticket
            </button>
        </form>
    );
};

export default TicketAyudaForm;

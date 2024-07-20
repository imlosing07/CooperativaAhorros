import React, { useState, useEffect } from 'react';
import AppointmentsHeader from './AppointmentsHeader';
import AppointmentsForm from './AppointmentsForm';
import AppointmentItem from './AppointmentItem';
import { fetchAppointmentsWithAxios, createAppointmentWithAxios, updateAppointmentWithAxios } from '../../services/Appointment';

const AppointmentsList = () => {
  const [appointmentsList, setAppointmentsList] = useState([]);
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const [selectedTable, setSelectedTable] = useState('accion');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchAppointmentsWithAxios(selectedTable)
      .then(data => setAppointmentsList(sortAppointments(data)))
      .catch(error => console.error('Error fetching appointments:', error));
  }, [selectedTable]);


  const handleFormSubmit = async (formData, isNew) => {
    if (isNew) {
      await createAppointmentWithAxios(selectedTable, formData);
    } else {
      await updateAppointmentWithAxios(selectedTable, currentAppointment, formData);
    }
    fetchAppointmentsWithAxios(selectedTable)
      .then(data => setAppointmentsList(sortAppointments(data)))
      .catch(error => console.error('Error fetching appointments:', error));
    setCurrentAppointment(null);
    setIsEditing(false);
  };

  const handleEdit = (appointment) => {
    setCurrentAppointment(appointment);
    setIsEditing(true);
  };

  const handleUpdateStatus = async (appointment, newStatus) => {
    const updatedAppointment = { ...appointment, [Object.keys(appointment).find(key => key.endsWith('Est'))]: newStatus };
    await updateAppointmentWithAxios(selectedTable, appointment, updatedAppointment, true);
    fetchAppointmentsWithAxios(selectedTable)
      .then(data => setAppointmentsList(sortAppointments(data)))
      .catch(error => console.error('Error fetching appointments:', error));
  };

  const handleTableSelect = (table) => {
    setSelectedTable(table);
    setCurrentAppointment(null);
  };

  const sortAppointments = (data) => {
    return data.map(appointment => {
      const entries = Object.entries(appointment);
      const idEntry = entries.shift(); // Remueve y guarda la primera entrada (ID)
      const estEntry = entries.find(([key]) => key.endsWith('Est')); // Encuentra la entrada que termina con 'Est'
      const otherEntries = entries.filter(([key]) => !key.endsWith('Est')); // Todas las otras entradas
  
      // Reconstruye el objeto en el orden deseado
      return Object.fromEntries([idEntry, ...otherEntries, estEntry]);
    }).sort((a, b) => Object.values(a)[0] - Object.values(b)[0]); // Ordena por ID
  };

  return (
    <>
      <AppointmentsHeader title="Cooperativa Ahorro" onTableSelect={handleTableSelect} />
      <div className='flex flex-col items-center gap-5 '>
        <AppointmentsForm
          appointment={currentAppointment}
          onSaveAppointment={handleFormSubmit}
          selectedTable={selectedTable}
          isEditing={isEditing}
        />
        <div className="relative max-w-full overflow-x-auto sm:rounded-lg">
          <table className="shadow-md max-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {appointmentsList.length > 0 && Object.keys(appointmentsList[0]).map((key, index) => (
                  <th key={index} className="px-4 py-3">
                    {key}
                  </th>
                ))}
                <th className="px-4 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {appointmentsList.map((appointment, index) => (
                <AppointmentItem
                  key={index}
                  appointment={appointment}
                  onEdit={handleEdit}
                  onUpdateStatus={handleUpdateStatus}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AppointmentsList;

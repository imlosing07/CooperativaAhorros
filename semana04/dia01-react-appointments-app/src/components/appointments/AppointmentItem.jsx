import React from 'react';

const AppointmentItem = ({ appointment, onEdit, onUpdateStatus }) => {
  const handleEditClick = () => {
    onEdit(appointment);
  };

  const handleInactivateClick = () => {
    onUpdateStatus(appointment, 'I');
  };

  const handleReactivateClick = () => {
    onUpdateStatus(appointment, 'A');
  };

  const handleRemoveClick = () => {
    onUpdateStatus(appointment, '*');
  };

  const entries = Object.entries(appointment);
  const [idKey, idValue] = entries[0];
  const [estKey, estValue] = entries[entries.length - 1];
  const middleEntries = entries.slice(1, -1);

  return (
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {idValue}
      </th>
      {middleEntries.map(([key, value]) => (
        <td key={key} className="px-4 py-4">
          {value}
        </td>
      ))}
      <td className="px-4 py-4">
        {estValue}
      </td>
      <td className='px-4 py-4'>
        <div className="flex gap-x-2.5">
          <button
            type="button"
            className="w-auto text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            onClick={handleEditClick}
          >
            Edit
          </button>
          {estValue === 'A' ? (
            <button
              type="button"
              className="w-auto focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              onClick={handleInactivateClick}
            >
              Inactivar
            </button>
          ) : (
            <button
              type="button"
              className="w-auto focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-2.5 py-2.5 dark:focus:ring-yellow-900"
              onClick={handleReactivateClick}
            >
              Reactivar
            </button>
          )}
          <button
            type="button"
            className="w-auto focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2.5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={handleRemoveClick}
          >
            Eliminar
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AppointmentItem;
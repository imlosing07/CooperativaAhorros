// src/components/AppointmentsForm.js
import React, { useState, useEffect } from 'react';
import { AccionForm, AreaForm, AvanceForm, CooperativaForm, DispositivosForm, FuncionesForm, CuentaForm, DireccionForm, LogAccionesForm, LogSesionesForm, ManualForm, MonedaForm, PersonaForm, UsuarioForm, TicketAyudaForm, TasaForm, SolucionForm, SocioForm, RolForm, ProductoForm, CargoForm} from '../forms';
import { fetchNextId } from '../../services/Appointment';
// Importa otros formularios aquí

const AppointmentsForm = ({ appointment, onSaveAppointment, selectedTable , isEditing  }) => {

  const [nextId, setNextId] = useState(null);

  useEffect(() => {
    if (!isEditing) {
      // Fetch the next available ID from the backend
      fetchNextId(selectedTable).then(setNextId);
    }
  }, [isEditing, selectedTable]);

  const renderForm = () => {
    switch (selectedTable) {
      case 'accion':
        return <AccionForm appointment={appointment} onSaveAppointment={onSaveAppointment} isEditing={isEditing}  nextId={nextId}/>;
      case 'area':
        return <AreaForm appointment={appointment} onSaveAppointment={onSaveAppointment} isEditing={isEditing} nextId={nextId}/>;
      case 'avance':
        return <AvanceForm appointment={appointment} onSaveAppointment={onSaveAppointment} isEditing={isEditing} nextId={nextId}/>;
      case 'cargo':
        return <CargoForm appointment={appointment} onSaveAppointment={onSaveAppointment} isEditing={isEditing} nextId={nextId}/>;
      case 'cooperativa':
        return <CooperativaForm appointment={appointment} onSaveAppointment={onSaveAppointment} isEditing={isEditing} nextId={nextId}/>;
      case 'cuenta':
        return <CuentaForm appointment={appointment} onSaveAppointment={onSaveAppointment} isEditing={isEditing} nextId={nextId}/>;
      case 'direccion':
        return <DireccionForm appointment={appointment} onSaveAppointment={onSaveAppointment} isEditing={isEditing} nextId={nextId}/>;
      case 'dispositivo':
        return <DispositivosForm appointment={appointment} onSaveAppointment={onSaveAppointment} isEditing={isEditing} nextId={nextId}/>;
      case 'funciones':
        return <FuncionesForm appointment={appointment} onSaveAppointment={onSaveAppointment} isEditing={isEditing} nextId={nextId}/>;
      case 'logAcciones':
        return <LogAccionesForm appointment={appointment} onSaveAppointment={onSaveAppointment} isEditing={isEditing} nextId={nextId}/>;
      case 'logSesiones':
        return <LogSesionesForm appointment={appointment} onSaveAppointment={onSaveAppointment} isEditing={isEditing} nextId={nextId}/>;
      case 'manual':
        return <ManualForm appointment={appointment} onSaveAppointment={onSaveAppointment} isEditing={isEditing} nextId={nextId}/>;
      case 'moneda':
        return <MonedaForm appointment={appointment} onSaveAppointment={onSaveAppointment} isEditing={isEditing} nextId={nextId}/>;
      case 'persona':
        return <PersonaForm appointment={appointment} onSaveAppointment={onSaveAppointment} isEditing={isEditing} nextId={nextId}/>;
      case 'producto':
        return <ProductoForm appointment={appointment} onSaveAppointment={onSaveAppointment} isEditing={isEditing} nextId={nextId}/>;
      case 'rol':
        return <RolForm appointment={appointment} onSaveAppointment={onSaveAppointment} isEditing={isEditing} nextId={nextId}/>;
      case 'socio':
        return <SocioForm appointment={appointment} onSaveAppointment={onSaveAppointment} isEditing={isEditing} nextId={nextId}/>;
      case 'solucion':
        return <SolucionForm appointment={appointment} onSaveAppointment={onSaveAppointment} isEditing={isEditing} nextId={nextId}/>;
      case 'tasa':
        return <TasaForm appointment={appointment} onSaveAppointment={onSaveAppointment} isEditing={isEditing} nextId={nextId}/>;
      case 'ticketAyuda':
        return <TicketAyudaForm appointment={appointment} onSaveAppointment={onSaveAppointment} isEditing={isEditing} nextId={nextId}/>;
      case 'usuario':
        return <UsuarioForm appointment={appointment} onSaveAppointment={onSaveAppointment} isEditing={isEditing} nextId={nextId}/>;
      // Añade casos para otros formularios aquí
      default:
        return null;
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900 antialiased w-max p-4 border rounded-md flex flex-col items-center gap-4">
      <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-2xl">
        {isEditing ? `Editar ${selectedTable}` : `Crear ${selectedTable}`}
      </h2>
      {renderForm()}
    </section>
  );
};

export default AppointmentsForm;

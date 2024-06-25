import { useState } from "react"

import AppointmentsHeader from "./components/appointments/AppointmentsHeader"
import AppointmentsForm from "./components/appointments/AppointmentsForm"
import AppointmentsList from "./components/appointments/AppointmentsList"

const App = () => {
  const INITIAL_APPOINTMENTS = [
    {
      id: '1',
      petName: 'Hermosa',
      petAge: '2',
      ownerName: 'Victor',
      appointmentDate: '',
      appointmentTime: '',
      symptoms: 'Duerme mucho 😒'
    }
  ]

  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS)

  const handleSaveAppointment = (appointment) => {
    setAppointments([...appointments, appointment])
  }

  return (
    <>
      <AppointmentsHeader title="Citas médicas para mascotas" />

      <main className="container m-auto flex gap-12 py-5">
        <AppointmentsForm
          onSaveAppointment={handleSaveAppointment}
        />

        <pre>{JSON.stringify(appointments, null, 2)}</pre>

        <AppointmentsList />
      </main>
    </>
  )
}

export default App
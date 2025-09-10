import React, { useEffect, useState } from 'react'
import { appointmentApi } from '../api/endpoints'
import { Appointment } from '../types'

export const AppointmentsPage: React.FC = () => {
  const [list, setList] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    appointmentApi.list().then(setList).finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <h2>Appointments</h2>
      {loading && <p>Loading...</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Patient</th><th>Doctor</th><th>Status</th><th>Start</th>
          </tr>
        </thead>
        <tbody>
          {list.map(a => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.patientId}</td>
              <td>{a.doctorId}</td>
              <td>{a.status}</td>
              <td>{a.startAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

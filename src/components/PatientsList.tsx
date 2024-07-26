import { Patient } from "../types"
import PatientCard from "./PatientCard"

interface PatientsListProps {
  patients: Patient[]
}

function PatientsList({ patients }: PatientsListProps) {
  return (
    <div className="mb-24 flex flex-1 flex-col gap-3 lg:mb-0 lg:grid lg:grid-cols-2">
      {patients.map((patient) => (
        <PatientCard patient={patient} key={patient.id} />
      ))}
    </div>
  )
}

export default PatientsList

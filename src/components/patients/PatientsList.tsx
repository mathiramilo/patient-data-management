import usePatients from "../../store/usePatients"
import PatientCard from "../patients/PatientCard"
import Loading from "../ui/Loading"
import Error from "../ui/Error"

function PatientsList() {
  const { filteredPatients, isLoading, error } = usePatients()

  return (
    <div className="mb-24 flex min-h-[65vh] flex-1 flex-col gap-3 lg:mb-0 lg:grid lg:min-h-0 lg:grid-cols-2">
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Error message={error} />
      ) : filteredPatients.length === 0 ? (
        <Error message="There are no patients that match your search" />
      ) : (
        filteredPatients.map((patient) => (
          <PatientCard patient={patient} key={patient.id} />
        ))
      )}
    </div>
  )
}

export default PatientsList

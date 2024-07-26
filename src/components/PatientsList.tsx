import usePatients from "../store/usePatients"
import PatientCard from "./PatientCard"
import Loading from "./Loading"
import Error from "./Error"

function PatientsList() {
  const { patients, isLoading, error } = usePatients()

  return (
    <div className="mb-24 flex min-h-[65vh] flex-1 flex-col gap-3 lg:mb-0 lg:grid lg:min-h-[85%] lg:grid-cols-2">
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Error message={error} />
      ) : (
        patients.map((patient) => (
          <PatientCard patient={patient} key={patient.id} />
        ))
      )}
    </div>
  )
}

export default PatientsList

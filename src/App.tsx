import { useEffect } from "react"

import AddPatientButton from "./components/AddPatientButton"
import Header from "./components/Header"
import PatientsList from "./components/PatientsList"
import Sidebar from "./components/Sidebar"
import AddEditModal from "./components/AddEditModal"
import usePatients from "./hooks/usePatients"

function App() {
  const { patients, setPatients } = usePatients()

  const fetchPatients = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + "/users")
      const data = await response.json()
      setPatients(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchPatients()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main className="min-h-screen bg-darkblue lg:flex lg:items-center lg:justify-center">
      <AddEditModal />
      <section className="min-h-screen bg-white/[0.03] p-3 lg:flex lg:h-[70vh] lg:min-h-0 lg:w-[90%] lg:max-w-[1400px] lg:border-[1px] lg:border-white/10 lg:px-0 lg:py-8">
        <Sidebar />
        <div className="overflow-y-scroll px-8 py-2 lg:mr-2 lg:flex-[4]">
          <Header />
          <PatientsList patients={patients} />
        </div>
        <AddPatientButton />
      </section>
    </main>
  )
}

export default App

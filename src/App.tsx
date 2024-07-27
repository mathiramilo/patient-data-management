import { useEffect } from "react"

import {
  AddEditModal,
  AddPatientButton,
  PatientsList,
  Header,
  Sidebar,
  NotificationsContainer
} from "./components"
import usePatients from "./store/usePatients"

function App() {
  const { fetchPatients } = usePatients()

  useEffect(() => {
    fetchPatients()
  }, [fetchPatients])

  return (
    <main className="min-h-screen bg-darkblue lg:flex lg:items-center lg:justify-center">
      <AddEditModal />
      <section className="min-h-screen bg-white/[0.03] p-3 lg:flex lg:h-[70vh] lg:min-h-0 lg:w-[90%] lg:max-w-[1400px] lg:border-[1px] lg:border-white/10 lg:px-0 lg:py-8">
        <Sidebar />
        <div className="lg:mr-2 lg:flex-[4] lg:overflow-y-scroll lg:px-8 lg:py-2">
          <Header />
          <PatientsList />
        </div>
        <AddPatientButton />
      </section>
      <NotificationsContainer />
    </main>
  )
}

export default App

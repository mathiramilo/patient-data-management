import { create } from "zustand"

import { Patient } from "../types"

interface PatientsStore {
  patients: Patient[]
  isLoading: boolean
  error: string | null
  fetchPatients: () => void
  addPatient: (
    patientData: Pick<Patient, "avatar" | "name" | "description" | "website">
  ) => void
  updatePatient: (
    patientId: string,
    patientData: Pick<Patient, "avatar" | "name" | "description" | "website">
  ) => void
}

const usePatients = create<PatientsStore>((set) => ({
  patients: [],
  isLoading: true,
  error: null,
  fetchPatients: async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + "/users")
      const data = await response.json()
      set({
        patients: data,
        isLoading: false
      })
    } catch (error) {
      console.error(error)
      set({
        error: "An error occurred while fetching patients",
        isLoading: false
      })
    }
  },
  addPatient: (patientData) =>
    set((state) => {
      const id = Number(state.patients[state.patients.length - 1].id) + 1
      const createdAt = new Date().toISOString()
      const newPatient = { ...patientData, id: id.toString(), createdAt }
      return { patients: [...state.patients, newPatient] }
    }),
  updatePatient: (patientId, patientData) =>
    set((state) => ({
      patients: state.patients.map((p) =>
        p.id === patientId ? { ...p, ...patientData } : p
      )
    }))
}))

export default usePatients

import { create } from "zustand"

import { Order, OrderBy, Patient } from "../types"

interface PatientsStore {
  patients: Patient[]
  filteredPatients: Patient[]
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
  filterPatients: (search: string, orderBy: OrderBy, order: Order) => void
}

const usePatients = create<PatientsStore>((set) => ({
  patients: [],
  filteredPatients: [],
  isLoading: true,
  error: null,
  fetchPatients: async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + "/users")
      const data = await response.json()
      set({
        patients: data,
        filteredPatients: data,
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
      return {
        patients: [...state.patients, newPatient],
        filteredPatients: [...state.patients, newPatient]
      }
    }),
  updatePatient: (patientId, patientData) =>
    set((state) => ({
      patients: state.patients.map((p) =>
        p.id === patientId ? { ...p, ...patientData } : p
      ),
      filteredPatients: state.patients.map((p) =>
        p.id === patientId ? { ...p, ...patientData } : p
      )
    })),
  filterPatients: (search, orderBy, order) =>
    set((state) => {
      const filteredPatients = state.patients
        .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
          if (order === "asc") {
            return orderBy === "id"
              ? Number(a[orderBy]) > Number(b[orderBy])
                ? 1
                : -1
              : orderBy === "name"
                ? a[orderBy].toLowerCase() > b[orderBy].toLowerCase()
                  ? 1
                  : -1
                : a[orderBy] < b[orderBy]
                  ? 1
                  : -1
          } else {
            return orderBy === "id"
              ? Number(a[orderBy]) < Number(b[orderBy])
                ? 1
                : -1
              : orderBy === "name"
                ? a[orderBy].toLowerCase() < b[orderBy].toLowerCase()
                  ? 1
                  : -1
                : a[orderBy] > b[orderBy]
                  ? 1
                  : -1
          }
        })
      return { filteredPatients }
    })
}))

export default usePatients

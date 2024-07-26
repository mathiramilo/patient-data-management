import { create } from "zustand"

import { Patient } from "../types"

interface PatientsState {
  patients: Patient[]
  setPatients: (patients: Patient[]) => void
  addPatient: (patient: Patient) => void
  updatePatient: (patientId: string, patientData: Patient) => void
}

const usePatients = create<PatientsState>((set) => ({
  patients: [],
  setPatients: (patients) => set({ patients }),
  addPatient: (patient) =>
    set((state) => ({ patients: [...state.patients, patient] })),
  updatePatient: (patientId, patientData) =>
    set((state) => ({
      patients: state.patients.map((p) =>
        p.id === patientId ? { ...p, ...patientData } : p
      )
    }))
}))

export default usePatients

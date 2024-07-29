import { create } from "zustand"

interface AddEditModalStore {
  isOpen: boolean
  patientId?: string | undefined
  open: () => void
  close: () => void
  setPatientId: (id: string | undefined) => void
}

const useAddEditModal = create<AddEditModalStore>((set) => ({
  isOpen: false,
  patientId: undefined,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  setPatientId: (id) => set({ patientId: id })
}))

export default useAddEditModal

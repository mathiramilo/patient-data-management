import { create } from "zustand"

interface ModalState {
  isOpen: boolean
  patientId?: string | undefined
  open: () => void
  close: () => void
  setPatientId: (id: string) => void
}

const useModal = create<ModalState>((set) => ({
  isOpen: false,
  patientId: undefined,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  setPatientId: (id) => set({ patientId: id }),
}))

export default useModal

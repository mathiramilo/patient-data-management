import { create } from "zustand"

interface ModalStore {
  isOpen: boolean
  patientId?: string | undefined
  open: () => void
  close: () => void
  setPatientId: (id: string | undefined) => void
}

const useModal = create<ModalStore>((set) => ({
  isOpen: false,
  patientId: undefined,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  setPatientId: (id) => set({ patientId: id })
}))

export default useModal

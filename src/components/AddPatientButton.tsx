import { IconUserPlus } from "@tabler/icons-react"

import useModal from "../hooks/useModal"

function AddPatientButton() {
  const { open, setPatientId } = useModal()

  const handleOpenAddModal = () => {
    setPatientId(undefined)
    open()
  }

  return (
    <button
      onClick={handleOpenAddModal}
      className="fixed bottom-6 left-[50%] flex w-4/5 translate-x-[-50%] items-center justify-center gap-3 rounded-full border-[1px] border-white/10 bg-white/5 p-4 backdrop-blur-xl active:bg-white/10 lg:hidden"
    >
      <IconUserPlus className="stroke-lime" />
      <span className="font-medium text-white">Add Patient</span>
    </button>
  )
}

export default AddPatientButton

import { IconUserPlus } from "@tabler/icons-react"

import useModal from "../store/useModal"

function Sidebar() {
  const { open, setPatientId } = useModal()

  const handleOpenAddModal = () => {
    setPatientId(undefined)
    open()
  }

  return (
    <aside className="hidden flex-1 flex-col items-center border-r-[1px] border-white/10 p-6 lg:flex">
      <img src="./lightit-logo.svg" alt="Light-It Logo" />

      <section className="mt-10">
        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-3 rounded-full p-4 px-8 transition-all hover:bg-white/5 active:bg-white/10"
        >
          <IconUserPlus className="stroke-lime" />
          <span className="font-medium text-white">Add Patient</span>
        </button>
      </section>
    </aside>
  )
}

export default Sidebar

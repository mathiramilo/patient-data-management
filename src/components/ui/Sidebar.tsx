import { animated, useSpring } from "@react-spring/web"
import { IconUserPlus } from "@tabler/icons-react"

import useModal from "../../store/useModal"

function Sidebar() {
  const { open, setPatientId } = useModal()

  const handleOpenAddModal = () => {
    setPatientId(undefined)
    open()
  }

  const spring1 = useSpring({
    from: { opacity: 0, transform: "translateY(10px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 150 }
  })
  const spring2 = useSpring({
    from: { opacity: 0, transform: "translateY(10px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 150 },
    delay: 100
  })

  return (
    <aside className="hidden flex-1 flex-col items-center border-r-[1px] border-white/10 p-6 lg:flex">
      <animated.img
        src="./lightit-logo.svg"
        alt="Light-It Logo"
        style={spring1}
      />

      <animated.section className="mt-10" style={spring2}>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-3 rounded-full p-4 px-8 transition-all hover:bg-white/5 active:bg-white/10"
        >
          <IconUserPlus className="stroke-lime" />
          <span className="font-medium text-white">Add Patient</span>
        </button>
      </animated.section>
    </aside>
  )
}

export default Sidebar

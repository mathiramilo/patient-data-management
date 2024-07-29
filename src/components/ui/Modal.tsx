import { animated, useSpring } from "@react-spring/web"

interface ModalProps {
  isOpen: boolean
  children: React.ReactNode
}

function Modal({ isOpen, children }: ModalProps) {
  const overlaySpring = useSpring({
    from: { opacity: 0 },
    to: { opacity: isOpen ? 1 : 0 },
    config: { duration: 150 }
  })
  const modalSpring = useSpring({
    from: { opacity: 0, transform: "scale(0.75)" },
    to: {
      opacity: isOpen ? 1 : 0,
      transform: isOpen ? "scale(1)" : "scale(0.75)"
    },
    config: { duration: 150 }
  })

  if (!isOpen) return null

  return (
    <animated.div
      className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-white/[0.02] backdrop-blur-lg"
      style={overlaySpring}
    >
      {/* Modal */}
      <animated.section
        className="h-screen w-screen bg-darkblue p-5 lg:h-max lg:w-[65%] lg:max-w-[700px] lg:rounded-lg lg:border-[1px] lg:border-white/10 lg:p-10 lg:shadow-2xl"
        style={modalSpring}
      >
        {children}
      </animated.section>
    </animated.div>
  )
}

export default Modal

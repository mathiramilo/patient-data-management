import { IconAlertTriangle } from "@tabler/icons-react"
import { animated, useSpring } from "@react-spring/web"

interface ErrorProps {
  message: string
}

function Error({ message }: ErrorProps) {
  const springs = useSpring({
    from: { opacity: 0, transform: "translateY(10px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 150 }
  })

  return (
    <animated.div
      className="flex flex-1 flex-col items-center justify-center gap-2 lg:col-span-2 lg:min-h-[50vh]"
      style={springs}
    >
      <IconAlertTriangle size={32} className="stroke-lime" />
      <p className="text-sm font-medium text-white">{message}</p>
    </animated.div>
  )
}

export default Error

import { animated, useSpring } from "@react-spring/web"

function Header() {
  const springs = useSpring({
    from: { opacity: 0, transform: "translateY(10px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 150 }
  })

  return (
    <animated.header
      className="mb-6 mt-4 flex flex-col items-center gap-2 lg:items-start lg:gap-0"
      style={springs}
    >
      <img src="./lightit-logo.svg" alt="Light-It Logo" className="lg:hidden" />
      <h1 className="text-lg font-bold text-white lg:text-3xl">
        Patient Data Management
      </h1>
    </animated.header>
  )
}

export default Header

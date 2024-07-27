function Header() {
  return (
    <header className="mb-6 mt-4 flex flex-col items-center gap-2 lg:items-start lg:gap-0">
      <img src="./lightit-logo.svg" alt="Light-It Logo" className="lg:hidden" />
      <h1 className="text-lg font-bold text-white lg:text-3xl">
        Patient Data Management
      </h1>
    </header>
  )
}

export default Header

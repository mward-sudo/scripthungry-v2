const Footer = () => {
  const today = new Date()
  const firstYear = 2021
  const currentYear = today.getFullYear()

  return (
    <footer className="p-4 pt-24 pb-8 text-center bg-gradient-to-t from-stone-300 dark:from-stone-800 text-stone-500">
      Copyright © {firstYear}
      {currentYear > firstYear ? `-${currentYear}` : ``} Michael Ward
    </footer>
  )
}

export default Footer

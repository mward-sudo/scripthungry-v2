import SiteTitle from './SiteTitle'
import type { FC } from 'react'

const Layout: FC = ({ children }) => {
  return (
    <>
      <header className="sticky mb-8 bg-white bg-opacity-75 shadow-sm dark:bg-gray-800 backdrop-blur-lg backdrop-filter">
        <div className="container px-3 py-4 mx-auto">
          <SiteTitle />
        </div>
      </header>
      <div className="container px-3 mx-auto">{children}</div>
    </>
  )
}

export default Layout

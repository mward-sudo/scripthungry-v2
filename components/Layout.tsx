import SiteTitle from './SiteTitle'
import type { FC } from 'react'

const Layout: FC = ({ children }) => {
  return (
    <>
      <header className="border-b-2 border-gray-200 opacity-75">
        <div className="container px-3 py-4 mx-auto">
          <SiteTitle />
        </div>
      </header>
      <div className="container px-3 mx-auto">{children}</div>
    </>
  )
}

export default Layout

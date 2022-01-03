import SiteTitle from './SiteTitle'
import type { FC } from 'react'
import Footer from './Footer'

const Layout: FC = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <div className="container px-3 py-4 mx-auto">
          <SiteTitle />
        </div>
      </header>
      <div className="container flex-1 px-3 mx-auto">{children}</div>
      <Footer />
    </div>
  )
}

export default Layout

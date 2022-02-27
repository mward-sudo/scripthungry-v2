import type { FC } from 'react'
import siteLinks from '../models/siteLinks'

import NavBar from './nav/NavBar'
import MobileDrawer from './nav//MobileDrawer'
import Footer from './Footer'

const Layout: FC = ({ children }) => {
  return (
    <div className="w-full h-screen drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="flex flex-col drawer-content">
        <NavBar links={siteLinks} />
        <div className="container flex-1 px-3 mx-auto">{children}</div>
        <Footer />
      </div>
      <MobileDrawer links={siteLinks} />
    </div>
  )
}

export default Layout

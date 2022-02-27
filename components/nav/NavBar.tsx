import type { ReactNode } from "react"
import type { Links } from "../../models/siteLinks"

import Link from "next/link"
import SiteTitle from "../SiteTitle"

type NavBar = {
  (props: {links: Links}): JSX.Element
}

const NavBar: NavBar = ({links}) => (
  <div className="w-full navbar bg-base-300">
    <div className="flex-1 px-2 mx-2"><SiteTitle /></div>
    <div className="flex-none lg:hidden">
      <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
      </label>
    </div> 
    <div className="hidden flex-none lg:block">
      <ul className="menu menu-horizontal">
        {links.map(({link, text}) => 
          <li key={link}><Link href={link}><a>{text}</a></Link></li>
        )}
      </ul>
    </div>
  </div>
)

export default NavBar

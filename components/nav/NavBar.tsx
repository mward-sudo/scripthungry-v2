import type { Links } from '../../models/siteLinks'

import Link from 'next/link'
import SiteTitle from '../SiteTitle'

type NavBar = {
  (props: { links: Links }): JSX.Element
}

const NavBar: NavBar = ({ links }) => (
  <div className="sticky top-0 z-50 w-full bg-transparent backdrop-blur-sm">
    <div className="w-full bg-transparent navbar">
      <div className="flex-1 px-2 mr-2">
        <SiteTitle />
      </div>
      <div className="flex-none lg:hidden">
        <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      <div className="hidden flex-none lg:block">
        <ul className="menu menu-horizontal bg-base-200 rounded-box">
          {links.map(({ link, text }) => (
            <li key={link}>
              <Link href={link}>
                <a>{text}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
)

export default NavBar

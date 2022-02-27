import Link from 'next/link'
import type { Links } from '../../models/siteLinks'

type MobileDrawer = {
  (props: { links: Links }): JSX.Element
}

const MobileDrawer: MobileDrawer = ({ links }) => (
  <div className="drawer-side">
    <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
    <ul className="overflow-y-auto p-4 w-80 menu bg-base-100">
      {links.map(({ link, text }) => (
        <li key={link}>
          <Link href={link}>
            <a>{text}</a>
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

export default MobileDrawer

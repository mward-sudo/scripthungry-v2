import Link from 'next/link'
import SiteLinks from '../../models/siteLinks'

const HomeLink = (text: string, link: string) => (
  <div>
    <div
      className="bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-500 font-display"
      key={text}
    >
      <Link href={link}>
        <a>{text}.</a>
      </Link>
    </div>
  </div>
)

const Links = () => (
  <div className="flex flex-wrap justify-around p-8 py-[5vh] text-3xl font-bold text-transparent gap-x-8 gap-y-6 card glass lg:card-side text-neutral-content">
    {SiteLinks.map(({ link, text }) => HomeLink(text, link))}
  </div>
)

export default Links

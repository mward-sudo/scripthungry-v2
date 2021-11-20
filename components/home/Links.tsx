import Link from 'next/link'

const links = [
  { link: '#', text: 'Showcase' },
  { link: '#', text: 'Blog' },
  { link: '#', text: 'GitHub' },
  { link: '#', text: 'LinkedIn' },
]

const HomeLink = (text: string, link: string) => (
  <div
    className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text font-display"
    key={text}
  >
    <Link href={link}>
      <a>{text}.</a>
    </Link>
  </div>
)

const Links = () => (
  <div className="flex flex-wrap justify-center my-16 text-3xl font-bold text-transparent gap-x-8 gap-y-6">
    {links.map(({ link, text }) => HomeLink(text, link))}
  </div>
)

export default Links

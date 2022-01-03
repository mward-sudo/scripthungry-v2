import Link from 'next/link'

const links = [
  { link: '/showcase', text: 'Showcase' },
  { link: '/blog', text: 'Blog' },
  { link: 'https://github.com/mward-sudo/scripthungry-v2', text: 'GitHub' },
  {
    link: 'https://www.linkedin.com/in/michael-ward-ba003622/',
    text: 'LinkedIn',
  },
]

const HomeLink = (text: string, link: string) => (
  <div>
    <div
      className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text font-display"
      key={text}
    >
      <Link href={link}>
        <a>{text}.</a>
      </Link>
    </div>
  </div>
)

const Links = () => (
  <div className="flex flex-wrap justify-around p-8 py-[5vh] my-16 -mt-[5vh] text-3xl font-bold text-transparent gap-x-8 gap-y-6 card glass lg:card-side text-neutral-content">
    {links.map(({ link, text }) => HomeLink(text, link))}
  </div>
)

export default Links

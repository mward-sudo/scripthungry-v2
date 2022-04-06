import Link from 'next/link'
import { ImStarFull } from 'react-icons/im'

type params = {
  name?: string
  url?: string
  description?: string | null
  stargazers?: {
    totalCount: number
  }
}

export const Repositories = ({
  name,
  url,
  description,
  stargazers,
}: params) => (
  <Link href={url || ''}>
    <a className="block p-4 my-4 bg-stone-100 dark:bg-stone-800 hover:outline-2 hover:outline-dotted hover:outline-stone-500">
      <div className="flex flex-auto gap-4 justify-between items-center w-full text-lg">
        <div>
          <div className="text-xl font-bold">{name}</div>
          <div className="text-italic">{description}</div>
        </div>
        <div className="min-w-fit">
          <ImStarFull className="inline-block mr-2 text-yellow-500 align-middle" />
          <span className="inline-block align-middle">
            {stargazers?.totalCount}
          </span>
        </div>
      </div>
    </a>
  </Link>
)

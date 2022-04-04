import Link from 'next/link'

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
    <a className="block p-4 my-4 bg-slate-500">
      <div className="flex flex-auto gap-4 justify-between w-full text-lg">
        <span className="text-xl font-bold">{name}</span>
        <span>
          <span className="mr-2">⭐</span> {stargazers?.totalCount}
        </span>
      </div>
      <span className="text-italic">{description}</span>
    </a>
  </Link>
)

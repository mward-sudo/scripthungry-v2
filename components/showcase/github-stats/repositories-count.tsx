import type { ReactElement } from 'react'
import type { GithubRepositories } from '../../../lib/github-types'

type RepositoriesCount = {
  (props: { repositories: GithubRepositories }): ReactElement<any, any>
}

export const RepositoriesCount: RepositoriesCount = ({ repositories }) => (
  <section className="p-2 px-4 text-center bg-orange-700 rounded-lg">
    <h1 className="text-xl font-bold">Repositories</h1>
    <p className="text-7xl text-bold">{repositories.totalCount}</p>
  </section>
)

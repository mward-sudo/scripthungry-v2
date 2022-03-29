import type { ReactElement } from 'react'
import type { GithuContributionsCollection } from '../../../lib/github-types'

type CommitCount = {
  (props: { contributions: GithuContributionsCollection }): ReactElement<
    any,
    any
  >
}

export const CommitCount: CommitCount = ({ contributions }) => (
  <section className="p-2 px-4 text-center bg-orange-700 rounded-lg">
    <h1 className="text-xl font-bold">Commits</h1>
    <p className="text-7xl text-bold">
      {contributions.totalCommitContributions}
    </p>
  </section>
)

import type { ReactElement } from 'react'
import type { GithuContributionsCollection } from '../../../lib/github-types'

type PRCount = {
  (props: { contributions: GithuContributionsCollection }): ReactElement<
    any,
    any
  >
}

export const PRCount: PRCount = ({ contributions }) => (
  <section className="p-2 px-4 text-center bg-orange-700 rounded-lg">
    <h1 className="text-xl font-bold">PR&rsquo;s</h1>
    <p className="text-7xl text-bold">
      {contributions.totalPullRequestContributions}
    </p>
  </section>
)

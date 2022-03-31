import type { ReactElement } from 'react'
import type { GithuContributionsCollection } from '../../../lib/github-types'

type IssueCount = {
  (props: { contributions: GithuContributionsCollection }): ReactElement<
    any,
    any
  >
}

export const IssueCount: IssueCount = ({ contributions }) => (
  <section className="p-2 px-4 text-center bg-orange-700 rounded-lg">
    <h1 className="text-xl font-bold">Issues</h1>
    <p className="text-7xl text-bold">
      {contributions.totalIssueContributions}
    </p>
  </section>
)

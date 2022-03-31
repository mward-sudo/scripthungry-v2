import type { ReactElement } from 'react'
import type { GithubFollowing } from '../../../lib/github-types'

type FollowingCount = {
  (props: { following: GithubFollowing }): ReactElement<any, any>
}

export const FollowingCount: FollowingCount = ({ following }) => (
  <section className="p-2 px-4 text-center bg-orange-700 rounded-lg">
    <h1 className="text-xl font-bold">Following</h1>
    <p className="text-7xl text-bold">{following.totalCount}</p>
  </section>
)

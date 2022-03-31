import type { ReactElement } from 'react'
import type { GithubFollowers } from '../../../lib/github-types'

type FollowersCount = {
  (props: { followers: GithubFollowers }): ReactElement<any, any>
}

export const FollowersCount: FollowersCount = ({ followers }) => (
  <section className="p-2 px-4 text-center bg-orange-700 rounded-lg">
    <h1 className="text-xl font-bold">Followers</h1>
    <p className="text-7xl text-bold">{followers.totalCount}</p>
  </section>
)

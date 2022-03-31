import type { ReactElement } from 'react'
import type { GithubUser } from '../../../lib/github-types'
import { Avatar } from './avatar'
import { Bio } from './bio'
import { CommitCount } from './commit-count'
import { Company } from './company'
import { ContributionsCount } from './contributions-count'
import { FollowersCount } from './followers-count'
import { FollowingCount } from './following-count'
import { IssueCount } from './issue-count'
import { Location } from './location'
import { PRCount } from './pr-count'
import { RepositoriesCount } from './repositories-count'
import { Username } from './username'

type Stats = {
  (props: { user: GithubUser }): ReactElement<any, any>
}

export const Stats: Stats = ({ user }) => {
  return (
    <div className="p-4 my-8 mx-8 bg-orange-800 full-width-escape prose-invert">
      <div className="container p-4 mx-auto text-white bg-white bg-opacity-10 rounded-xl border-2 border-orange-600 dark:bg-black dark:bg-opacity-20">
        <div className="flex flex-col flex-1 gap-8 items-center md:items-start md:flex-row">
          <div>
            <Avatar avatar={user.avatarUrl} />
            <Location location={user.location} />
          </div>
          <div className="text-center">
            <Username username={user.login} name={user.name} />
            <Bio bio={user.bio} />
            <Company company={user.company} />
          </div>
        </div>
        <div className="flex flex-row flex-wrap gap-4 justify-center mt-8">
          <RepositoriesCount repositories={user.repositories} />
          <ContributionsCount contributions={user.contributionsCollection} />
          <CommitCount contributions={user.contributionsCollection} />
          <IssueCount contributions={user.contributionsCollection} />
          <PRCount contributions={user.contributionsCollection} />
          <FollowingCount following={user.following} />
          <FollowersCount followers={user.followers} />
        </div>
      </div>
    </div>
  )
}

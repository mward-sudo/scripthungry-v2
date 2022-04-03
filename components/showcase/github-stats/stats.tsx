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
import type { GitHubUserQuery } from '../../../generated/github'

export const Stats = ({ user }: { user: GitHubUserQuery['user'] }) => {
  const repositoriesCount = user?.repositories.totalCount
  const contributionsCount =
    user?.contributionsCollection.contributionCalendar.totalContributions
  const commitCount = user?.contributionsCollection.totalCommitContributions
  const issueCount = user?.contributionsCollection.totalIssueContributions
  const prCount = user?.contributionsCollection.totalPullRequestContributions
  const followingCount = user?.following.totalCount
  const followersCount = user?.followers.totalCount

  return (
    <div className="p-4 my-8 mx-8 bg-orange-800 full-width-escape prose-invert">
      <div className="container p-4 mx-auto text-white bg-white bg-opacity-10 rounded-xl border-2 border-orange-600 dark:bg-black dark:bg-opacity-20">
        <div className="flex flex-col flex-1 gap-8 items-center md:items-start md:flex-row">
          <div className="w-[200px]">
            <Avatar avatar={user?.avatarUrl} />
            <Location location={user?.location} />
          </div>
          <div className="w-full text-center">
            <Username username={user?.login} name={user?.name || ''} />
            <Bio bio={user?.bio || ''} />
            <Company company={user?.company} />
          </div>
        </div>
        <div className="flex flex-row flex-wrap gap-4 justify-center mt-8">
          <RepositoriesCount count={repositoriesCount} />
          <ContributionsCount count={contributionsCount} />
          <CommitCount count={commitCount} />
          <IssueCount count={issueCount} />
          <PRCount count={prCount} />
          <FollowingCount count={followingCount} />
          <FollowersCount count={followersCount} />
        </div>
      </div>
    </div>
  )
}

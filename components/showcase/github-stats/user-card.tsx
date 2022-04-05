import { Avatar } from './avatar'
import type { GitHubUserQuery } from '../../../generated/github'
import { Repositories } from './repositories'
import { Stats } from './stats'

export const UserCard = ({ user }: { user: GitHubUserQuery['user'] }) => {
  const repositoriesCount = user?.repositories.totalCount
  const contributionsCount =
    user?.contributionsCollection.contributionCalendar.totalContributions
  const commitCount = user?.contributionsCollection.totalCommitContributions
  const issueCount = user?.contributionsCollection.totalIssueContributions
  const prCount = user?.contributionsCollection.totalPullRequestContributions
  const followingCount = user?.following.totalCount
  const followersCount = user?.followers.totalCount
  const repositories = user?.repositories.nodes
    ?.slice()
    .sort((a, b) =>
      a !== null && b !== null
        ? b.stargazers.totalCount - a.stargazers.totalCount
        : 1
    )

  // Calculate the total number of stars in the array user?.repositories?.nodes
  // using user?.repositories?.nodes?.stargazers?.totalCount
  const starsCount = user?.repositories?.nodes?.reduce(
    (total, node) => total + (node?.stargazers.totalCount || 0),
    0
  )

  const stats = [
    { label: 'Repositories', value: repositoriesCount },
    { label: 'Contributions', value: contributionsCount },
    { label: 'Commits', value: commitCount },
    { label: 'Issues', value: issueCount },
    { label: 'PRs', value: prCount },
    { label: 'Following', value: followingCount },
    { label: 'Followers', value: followersCount },
    { label: 'Stars', value: starsCount },
  ]

  return (
    <>
      <div className="my-12 full-width-escape">
        <div className="p-4 text-center lg:p-16 hero bg-base-200 lg:text-left">
          <div className="flex-col gap-12 hero-content lg:flex-row max-w-[50rem]">
            <Avatar avatar={user?.avatarUrl} />
            <div>
              <h1 className="text-4xl font-bold sm:text-5xl">
                Hello there, I am {user?.name || user?.login}
              </h1>
              {user?.bio && <p className="py-6">{user?.bio}</p>}
            </div>
          </div>
        </div>
      </div>
      <Stats stats={stats} />

      <div className="mx-auto mt-16 max-w-4xl">
        <h2 className="text-3xl font-bold text-center">User Repositories</h2>
        {repositories &&
          repositories?.map((repositories) => (
            <Repositories
              key={repositories?.url}
              name={repositories?.name}
              url={repositories?.url}
              description={repositories?.description}
              stargazers={repositories?.stargazers}
            />
          ))}
      </div>
    </>
  )
}

import { Bio } from './../../components/showcase/github-stats/bio'
import { Username } from './../../components/showcase/github-stats/username'
import { Company } from './../../components/showcase/github-stats/company'
import type { NextPage } from 'next'

import { getUser } from '../../lib/github'

import Layout from '../../components/Layout'
import PageTitle from '../../components/PageTitle'
import type { GithubUser } from '../../lib/github-types'
import { Location } from '../../components/showcase/github-stats/location'
import { FollowingCount } from '../../components/showcase/github-stats/following-count'
import { FollowersCount } from '../../components/showcase/github-stats/followers-count'
import { RepositoriesCount } from '../../components/showcase/github-stats/repositories-count'
import { ContributionsCount } from '../../components/showcase/github-stats/contributions-count'
import { Avatar } from '../../components/showcase/github-stats/avatar'
import { CommitCount } from '../../components/showcase/github-stats/commit-count'
import { IssueCount } from '../../components/showcase/github-stats/issue-count'
import { PRCount } from '../../components/showcase/github-stats/pr-count'

type Props = {
  user: GithubUser
}

const GitHubStatsPage: NextPage<Props> = ({ user }) => {
  return (
    <Layout>
      <PageTitle>GitHub User Stats</PageTitle>
      <div className="p-4 my-8 mx-8 full-width-escape prose-invert">
        <div className="p-8 mx-2 bg-orange-800">
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
              <ContributionsCount
                contributions={user.contributionsCollection}
              />
              <CommitCount contributions={user.contributionsCollection} />
              <IssueCount contributions={user.contributionsCollection} />
              <PRCount contributions={user.contributionsCollection} />
              <FollowingCount following={user.following} />
              <FollowersCount followers={user.followers} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const gitHubUser = await getUser('mward-sudo')

  return {
    props: { user: gitHubUser },
    revalidate: 60,
  }
}

export default GitHubStatsPage

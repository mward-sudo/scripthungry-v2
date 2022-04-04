import { Error } from './../../components/showcase/github-stats/error'
import { LoadNewUser } from './../../components/showcase/github-stats/load-new-user'
import type { GetStaticProps, NextPage } from 'next'
import type { ApolloQueryResult } from '@apollo/client'

import { gitHubClient } from '../../lib/apollo-client'
import { GitHubUserQuery, useGitHubUserLazyQuery } from '../../generated/github'
import { Stats } from '../../components/showcase/github-stats/stats'
import { gitHubUserQuery } from '../../graphql/github'

import Layout from '../../components/Layout'
import PageTitle from '../../components/PageTitle'

// Tracks the first render of the page
let firstRender = true

const userLoadingState: GitHubUserQuery['user'] = {
  login: 'Loading...',
  name: '',
  bio: '',
  avatarUrl: '/img/avatar.png',
  url: '',
  contributionsCollection: {
    totalCommitContributions: 0,
    totalIssueContributions: 0,
    totalPullRequestContributions: 0,
    contributionCalendar: {
      totalContributions: 0,
      weeks: [],
    },
    contributionYears: [],
  },
  followers: { totalCount: 0 },
  following: { totalCount: 0 },
  repositories: {
    totalCount: 0,
    nodes: [
      {
        name: 'Loading...',
        description: '',
        url: '#',
        stargazers: { totalCount: 0 },
        watchers: { totalCount: 0 },
        forks: { totalCount: 0 },
      },
    ],
  },
}

type Props = {
  response: ApolloQueryResult<GitHubUserQuery>
}
const GitHubStatsPage: NextPage<Props> = ({ response }) => {
  // Hook to get the user's GitHub profile data when requested through getUser
  let [getUser, { error, data, loading, previousData }] =
    useGitHubUserLazyQuery({
      variables: { username: 'mward-sudo' },
      client: gitHubClient,
    })

  // If this is the first page render, use the response parameter
  if (firstRender) {
    data = response.data
    error = response.error
    // Indicate that the first render has been completed
    firstRender = false
  }

  const reloadData = () => {
    const elem = document.getElementById('username') as HTMLInputElement
    const username = elem?.value
    getUser({ variables: { username } })
  }

  return (
    <Layout>
      <PageTitle>GitHub User Stats</PageTitle>
      <LoadNewUser login={data?.user?.login} reloadData={reloadData} />
      {(data || loading) && !error && (
        <Stats user={data?.user || userLoadingState} />
      )}
      {error && <Error error={error.name} />}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await gitHubClient.query<GitHubUserQuery>({
    query: gitHubUserQuery,
    variables: { username: 'mward-sudo' },
  })

  return {
    props: {
      response,
    },
    revalidate: 60,
  }
}

export default GitHubStatsPage

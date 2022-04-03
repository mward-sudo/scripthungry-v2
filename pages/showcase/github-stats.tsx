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

type Props = {
  response: ApolloQueryResult<GitHubUserQuery>
}
const GitHubStatsPage: NextPage<Props> = ({ response }) => {
  // Hook to get the user's GitHub profile data when requested through getUser
  let [getUser, { error, data }] = useGitHubUserLazyQuery({
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
      {data?.user && <Stats user={data?.user} />}
      {error && (
        <div className="p-8 px-4 my-8 text-3xl font-bold text-center text-red-800 bg-red-100">
          Error: {error.message}
        </div>
      )}
      <div className="my-8 text-2xl text-center">
        <input
          className="p-2 mr-4 text-gray-800 rounded border-2 border-black"
          id="username"
          type="text"
          placeholder={data?.user?.login}
        />
        <button
          className="p-2 px-4 rounded-lg cursor-pointer bg-primary"
          onClick={reloadData}
          id="load-button"
        >
          Load GitHub user stats
        </button>
      </div>
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

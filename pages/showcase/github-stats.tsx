import { Errors } from './../../components/showcase/github-stats/errors'
import type { NextPage } from 'next'
import { useState } from 'react'
import Layout from '../../components/Layout'
import PageTitle from '../../components/PageTitle'
import { LoadNewUser } from '../../components/showcase/github-stats/load-new-user'
import { Stats } from '../../components/showcase/github-stats/stats'

import { getUser } from '../../lib/github'

import {
  GithubApiResponse,
  isGithubApiErrors,
  isGithubUser,
} from '../../lib/github-types'

type Props = {
  response: GithubApiResponse
}

const GitHubStatsPage: NextPage<Props> = ({ response }) => {
  const [responseState, setResponseState] = useState(response)

  return (
    <Layout>
      <PageTitle>GitHub User Stats</PageTitle>
      {isGithubUser(responseState.user) && <Stats user={responseState.user} />}
      {isGithubApiErrors(responseState) && (
        <Errors errors={responseState.errors} />
      )}
      <LoadNewUser
        setResponseState={setResponseState}
        responseState={responseState}
      />
    </Layout>
  )
}

export const getStaticProps = async () => {
  const response = await getUser('mward-sudo')

  return {
    props: { response },
    revalidate: 60,
  }
}

export default GitHubStatsPage

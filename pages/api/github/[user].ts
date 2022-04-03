import type { NextApiRequest, NextApiResponse } from 'next'

import { gitHubClient } from './../../../lib/apollo-client'
import { gitHubUserQuery } from './../../../graphql/github'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = req.query

  const query = gitHubUserQuery

  const client = gitHubClient

  const response = await client.query({ query, variables: { username: user } })

  res.statusCode = 200
  res.json(response)
}

export default handler

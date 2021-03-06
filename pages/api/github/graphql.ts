import type { NextApiRequest, NextApiResponse } from 'next'

import { proxyFetch } from './../../../lib/graphql-proxy'

const envErrorMessage =
  'Graph CMS passthrough endpoint not set. Set SERVER_GITHUB_ENDPOINT and API_GITHUB_TOKEN in the environment variables.'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Get the GraphCMS Endpoint from environment variables
  const { SERVER_GITHUB_ENDPOINT, API_GITHUB_TOKEN } = process.env

  // If no endpoint is set, throw an error
  if (!SERVER_GITHUB_ENDPOINT || !API_GITHUB_TOKEN)
    throw new Error(envErrorMessage)

  // Use the current request to query the endpointUrl, adding the authKey as Authorization header
  const response = await proxyFetch({
    request: req,
    response: res,
    endpointUrl: SERVER_GITHUB_ENDPOINT,
    authKey: API_GITHUB_TOKEN,
  })

  // Send the response back to the client
  return response
}

export default handler

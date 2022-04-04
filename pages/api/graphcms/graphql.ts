import type { NextApiRequest, NextApiResponse } from 'next'

import { proxyFetch } from './../../../lib/graphql-proxy'

const envErrorMessage =
  'Graph CMS passthrough endpoint not set. Set GRAPHCMS_ENDPOINT and GRAPHCMS_TOKEN in the environment variables.'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Get the GraphCMS Endpoint from environment variables
  const { GRAPHCMS_ENDPOINT, GRAPHCMS_TOKEN } = process.env

  // If no endpoint is set, throw an error
  if (!GRAPHCMS_ENDPOINT || !GRAPHCMS_TOKEN) throw new Error(envErrorMessage)

  // Use the current request to query the endpointUrl, adding the authKey as Authorization header
  const response = await proxyFetch({
    request: req,
    response: res,
    endpointUrl: GRAPHCMS_ENDPOINT,
    authKey: GRAPHCMS_TOKEN,
  })

  // Send the response back to the client
  return response
}

export default handler

import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Get Github Endpoint from environment variables
  const endpointUrl = process.env.SERVER_GITHUB_ENDPOINT
  // Get Github Token from environment variables
  const authKey = process.env.API_GITHUB_TOKEN

  // If no endpoint is set, throw an error
  if (!endpointUrl) {
    throw new Error(
      `Github passthrough endpoint not set. Set API_GITHUB_ENDPOINT in the environment variables.`
    )
  }

  // Use the current request to query the endpointUrl, adding the authKey as Authorization header
  const response = await fetch(endpointUrl, {
    method: req.method || 'POST',
    headers: {
      Authorization: `Bearer ${authKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: req.body.query,
      variables: req.body.variables,
    }),
  })

  // Send the response back to the client
  res.statusCode = await response.status
  res.json(await response.json())
}

export default handler

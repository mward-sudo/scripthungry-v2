import type { NextApiRequest, NextApiResponse } from 'next'

export const proxyFetch = async ({
  request,
  response,
  endpointUrl,
  authKey,
}: {
  request: NextApiRequest
  response: NextApiResponse
  endpointUrl: string
  authKey: string
}) => {
  // Use the current request to query the endpointUrl, adding the authKey as Authorization header
  const proxyResponse = await fetch(endpointUrl, {
    method: request.method || 'POST',
    headers: {
      Authorization: `Bearer ${authKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: request.body.query,
      variables: request.body.variables,
    }),
  })

  // Send the response back to the client
  response.statusCode = await proxyResponse.status
  response.json(await proxyResponse.json())

  return proxyResponse
}

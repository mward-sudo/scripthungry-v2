import { isGithubResponse } from './../../../lib/github-types'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getUser } from '../../../lib/github'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { user } = req.query

  if (typeof user === 'string') {
    const response = await getUser(user)
    if (isGithubResponse(response)) {
      res.status(200).json(response)
    } else {
      res.status(400).json({ message: 'Bad request' })
    }
  } else {
    res.status(404)
  }
}

import type { GithubUser } from './github-types'

import { Octokit } from 'octokit'
import { isGithubUser } from './github-types'

/**
 * Create a new instance of Octokit.
 */
const octokit = new Octokit({
  auth: process.env.API_GITHUB_TOKEN,
  userAgent: 'octokit/rest.js v1.2.3',
})

/**
 * Function to get a github user using a graphql query.
 */
export const getUser = async (username: string): Promise<GithubUser> => {
  const { user } = await octokit.graphql(
    `query {
      user(login: "${username}") {
        login
        name
        bio
        avatarUrl
        url
        company
        location
        followers {
          totalCount
        }
        following {
          totalCount
        }
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays {
                contributionLevel
                contributionCount
              }
            }
            totalContributions
          }
          contributionYears
          totalCommitContributions
          totalIssueContributions
          totalPullRequestContributions
        }
        repositories(first: 100) {
          totalCount
          nodes {
            name
            description
            url
            stargazers {
              totalCount
            }
            watchers {
              totalCount
            }
            forks {
              totalCount
            }
          }
        }
      }
    }`
  )

  if (!isGithubUser(user)) {
    throw new Error('Invalid user')
  }

  return user
}

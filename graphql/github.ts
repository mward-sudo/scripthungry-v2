import { gql } from '@apollo/client'

export const gitHubUserQuery = gql`
  query gitHubUser($username: String!) {
    user(login: $username) {
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
  }
`

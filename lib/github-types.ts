export type GithubUser = {
  login: string
  name: string | null
  bio: string | null
  avatarUrl: string | null
  url: string | null
  company: string | null
  location: string | null
  followers: GithubFollowers
  following: GithubFollowing
  contributionsCollection: GithuContributionsCollection
  repositories: GithubRepositories
}
export type GithubFollowers = {
  totalCount: number
}
export type GithubFollowing = {
  totalCount: number
}
export type GithuContributionsCollection = {
  contributionCalendar: GithubContributionCalendar
  contributionYears: number[]
  totalCommitContributions: number
  totalIssueContributions: number
  totalPullRequestContributions: number
}
export type GithubContributionCalendar = {
  weeks: GithubContributionWeek[]
  totalContributions: number
}
export type GithubContributionWeek = {
  contributionDays: GithubContributionDay[]
}
export type GithubContributionDay = {
  contributionLevel: string
  contributionCount: number
}
export type GithubRepositories = {
  totalCount: number
  nodes: GithubRepository[]
}
type GithubRepository = {
  name: string
  description: string | null
  url: string
  stargazers: GithubStarGazers
  watchers: GithubWatchers
  forks: GithubForks
}
type GithubStarGazers = {
  totalCount: number
}
type GithubWatchers = {
  totalCount: number
}
type GithubForks = {
  totalCount: number
}

// Type predicate function for getUser return value, must match shape of graphql query
export const isGithubUser = (user: any): user is GithubUser => {
  if (typeof user !== 'object' || user === null) {
    return false
  }

  // Test if user has all required fields
  return (
    typeof user.login === 'string' &&
    (typeof user.name === 'string' || user.name === null) &&
    (typeof user.bio === 'string' || user.bio === null) &&
    (typeof user.avatarUrl === 'string' || user.avatarUrl === null) &&
    typeof user.url === 'string' &&
    (typeof user.company === 'string' || user.company === null) &&
    (typeof user.location === 'string' || user.location === null) &&
    isGithubFollowers(user.followers) &&
    isGithubFollowing(user.following) &&
    isGithubContributionsCollection(user.contributionsCollection) &&
    isGihubRepositories(user.repositories)
  )
}

const isGithubFollowers = (followers: any): followers is GithubFollowers => {
  if (typeof followers !== 'object' || followers === null) {
    return false
  }

  return typeof followers.totalCount === 'number'
}

const isGithubFollowing = (following: any): following is GithubFollowing => {
  if (typeof following !== 'object' || following === null) {
    return false
  }

  return typeof following.totalCount === 'number'
}

const isGithubContributionsCollection = (
  contributionsCollection: any
): contributionsCollection is GithuContributionsCollection => {
  if (
    typeof contributionsCollection !== 'object' ||
    contributionsCollection === null
  ) {
    return false
  }

  return (
    isGithubContributionCalendar(
      contributionsCollection.contributionCalendar
    ) &&
    contributionsCollection.contributionYears.every(
      (year: any) => typeof year === 'number'
    ) &&
    typeof contributionsCollection.totalCommitContributions === 'number' &&
    typeof contributionsCollection.totalIssueContributions === 'number' &&
    typeof contributionsCollection.totalPullRequestContributions === 'number'
  )
}

const isGithubContributionCalendar = (
  contributionCalendar: any
): contributionCalendar is GithubContributionCalendar => {
  if (
    typeof contributionCalendar !== 'object' ||
    contributionCalendar === null
  ) {
    return false
  }

  return (
    Array.isArray(contributionCalendar.weeks) &&
    contributionCalendar.weeks.every((week: any) => isGithubWeek(week)) &&
    typeof contributionCalendar.totalContributions === 'number'
  )
}

const isGithubWeek = (week: any): week is GithubContributionWeek => {
  if (typeof week !== 'object' || week === null) {
    return false
  }

  return (
    Array.isArray(week.contributionDays) &&
    week.contributionDays.every((day: any) => isGithubDay(day))
  )
}

const isGithubDay = (day: any): day is GithubContributionDay => {
  if (typeof day !== 'object' || day === null) {
    return false
  }

  return (
    typeof day.contributionLevel === 'string' &&
    typeof day.contributionCount === 'number'
  )
}

const isGihubRepositories = (
  repositoryNodes: any
): repositoryNodes is GithubRepositories => {
  if (typeof repositoryNodes !== 'object' || repositoryNodes === null) {
    return false
  }

  return (
    typeof repositoryNodes.totalCount === 'number' &&
    Array.isArray(repositoryNodes.nodes) &&
    repositoryNodes.nodes.every((node: any) => isGithubRepositoryNode(node))
  )
}

const isGithubRepositoryNode = (
  repositoryNode: any
): repositoryNode is GithubRepository => {
  if (typeof repositoryNode !== 'object' || repositoryNode === null) {
    return false
  }

  // Test if repository has all required fields
  return (
    typeof repositoryNode.name === 'string' &&
    (typeof repositoryNode.description === 'string' ||
      repositoryNode.description === null) &&
    typeof repositoryNode.url === 'string' &&
    isGithubStarGazers(repositoryNode.stargazers) &&
    isGithubWatchers(repositoryNode.watchers) &&
    isGithubForks(repositoryNode.forks)
  )
}

const isGithubStarGazers = (
  starGazers: any
): starGazers is GithubStarGazers => {
  if (typeof starGazers !== 'object' || starGazers === null) {
    return false
  }

  return typeof starGazers.totalCount === 'number'
}

const isGithubWatchers = (watchers: any): watchers is GithubWatchers => {
  if (typeof watchers !== 'object' || watchers === null) {
    return false
  }

  return typeof watchers.totalCount === 'number'
}

const isGithubForks = (forks: any): forks is GithubForks => {
  if (typeof forks !== 'object' || forks === null) {
    return false
  }

  return typeof forks.totalCount === 'number'
}

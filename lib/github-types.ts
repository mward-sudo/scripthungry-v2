export type GithubApiResponse = {
  user?: GithubUser
  errors?: GithubApiErrors
}

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
export type GithubRepository = {
  name: string
  description: string | null
  url: string
  stargazers: GithubStarGazers
  watchers: GithubWatchers
  forks: GithubForks
}
export type GithubStarGazers = {
  totalCount: number
}
export type GithubWatchers = {
  totalCount: number
}
export type GithubForks = {
  totalCount: number
}

export type GithubErrorResponse = {
  response: {
    errors: GithubApiErrors
  }
}
export type GithubApiErrors = {
  errors: GithubApiError[]
}
export type GithubApiError = {
  type: string
  path: string[]
  locations: GithubApiErrorLocation[]
  message: string
}
export type GithubApiErrorLocation = {
  column: number
  line: number
}

export const isGithubResponse = (
  response: any
): response is GithubApiResponse => {
  return (
    (response.hasOwnProperty('user') && isGithubUser(response.user)) ||
    (response.hasOwnProperty('errors') && isGithubApiErrors(response))
  )
}

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

export const isGithubApiErrorResponse = (
  response: any
): response is GithubErrorResponse => {
  return response.hasOwnProperty('errors') && isGithubApiErrors(response)
}

export const isGithubApiErrors = (errors: any): errors is GithubApiErrors => {
  if (typeof errors !== 'object' || errors === null) {
    return false
  }

  return (
    Array.isArray(errors.errors) &&
    errors.errors.every((error: any) => isGithubApiError(error))
  )
}

const isGithubApiError = (error: any): error is GithubApiError => {
  if (typeof error !== 'object' || error === null) {
    return false
  }

  return (
    typeof error.message === 'string' &&
    typeof error.type === 'string' &&
    Array.isArray(error.path) &&
    error.path.every((path: any) => typeof path === 'string') &&
    Array.isArray(error.locations) &&
    error.locations.every((location: any) => isGithubApiErrorLocation(location))
  )
}

const isGithubApiErrorLocation = (
  location: any
): location is GithubApiErrorLocation => {
  if (typeof location !== 'object' || location === null) {
    return false
  }

  return (
    typeof location.line === 'number' && typeof location.column === 'number'
  )
}

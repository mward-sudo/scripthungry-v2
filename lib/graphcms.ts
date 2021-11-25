import SiteSettings from './settings'

export interface iCallGraphCMS {
  (query: string): Promise<unknown>
}

type iGraphCmsFetchOptions = {
  method: 'POST'
  headers: {
    Authorization: string
    'Content-Type': 'application/json'
  }
  body: string
}

/**
 * @var postsPerPage - The number of posts to be displayed per page, as set in site settings
 */
export const postsPerPage = SiteSettings.POSTS_PER_PAGE

/**
 * Sends query string parameter to GraphCMS enpoint and returns
 * the results of the query as JSON.
 * @param query - GraphQL query string
 * @returns JSON result of query
 */
export const callGraphCMS: iCallGraphCMS = async (query) => {
  /**
   * @var fetchUrl - The GraphQL endpoint for GraphQL, set in environment variables / platform secrets
   */
  const fetchUrl = process.env.GRAPHCMS_ENDPOINT || ''

  /**
   * @var fetchOptions - POST query parameters to send to GraphCMS endpoint
   */
  const fetchOptions: iGraphCmsFetchOptions = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  }

  /**
   * Try the request, return JSON data from GraphCMS or throw error
   */
  return await postRequest(fetchUrl, fetchOptions)
}

/**
 * Async function executes the POST request and returns data or throws error
 * @param fetchUrl - The URL to POST to
 * @param fetchOptions - The options object for the fetch function
 * @returns JSON data returned from fetch request
 */
const postRequest = async (
  fetchUrl: string,
  fetchOptions: iGraphCmsFetchOptions
) => {
  try {
    return await fetch(fetchUrl, fetchOptions).then((response) =>
      response.json()
    )
  } catch (error) {
    throw new Error('Could not fetch data from GraphCMS')
  }
}

import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const isServer = typeof window === 'undefined'

const {
  NEXT_PUBLIC_CLIENT_GITHUB_ENDPOINT,
  SERVER_GITHUB_ENDPOINT,
  NEXT_PUBLIC_CLIENT_GRAPHCMS_ENDPOINT,
  SERVER_GRAPHCMS_ENDPOINT,
} = process.env
const { API_GITHUB_TOKEN } = isServer ? process.env : { API_GITHUB_TOKEN: '' }
const { GRAPHCMS_TOKEN } = isServer ? process.env : { GRAPHCMS_TOKEN: '' }

const httpLink = ({ endpoint }: { endpoint?: string }) =>
  createHttpLink({
    uri: endpoint,
  })

const authLink = (token?: string) =>
  setContext((_, { headers }) => {
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: isServer ? `Bearer ${token}` : '',
      },
    }
  })

const client = ({
  clientEndpoint,
  serverEndpoint,
  authToken,
}: {
  clientEndpoint?: string
  serverEndpoint?: string
  authToken?: string
}) => {
  return new ApolloClient({
    link: isServer
      ? authLink(authToken).concat(httpLink({ endpoint: serverEndpoint }))
      : httpLink({ endpoint: clientEndpoint }),
    ssrMode: typeof window === 'undefined',
    cache: new InMemoryCache(),
  })
}

export const gitHubClient = client({
  clientEndpoint: NEXT_PUBLIC_CLIENT_GITHUB_ENDPOINT,
  serverEndpoint: SERVER_GITHUB_ENDPOINT,
  authToken: API_GITHUB_TOKEN,
})
export const graphCmsClient = client({
  clientEndpoint: NEXT_PUBLIC_CLIENT_GRAPHCMS_ENDPOINT,
  serverEndpoint: SERVER_GRAPHCMS_ENDPOINT,
  authToken: GRAPHCMS_TOKEN,
})

import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const isServer = typeof window === 'undefined'

const clientEndpoint = process.env.NEXT_PUBLIC_CLIENT_GITHUB_ENDPOINT
const serverEndpoint = process.env.SERVER_GITHUB_ENDPOINT
const token = isServer ? process.env.API_GITHUB_TOKEN : ''

const httpLink = ({ endpoint }: { endpoint?: string }) =>
  createHttpLink({
    uri: endpoint,
  })

const authLink = setContext((_, { headers }) => {
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
}: {
  clientEndpoint?: string
  serverEndpoint?: string
}) => {
  return new ApolloClient({
    link: isServer
      ? authLink.concat(httpLink({ endpoint: serverEndpoint }))
      : httpLink({ endpoint: clientEndpoint }),
    ssrMode: typeof window === 'undefined',
    cache: new InMemoryCache(),
  })
}

export const gitHubClient = client({ clientEndpoint, serverEndpoint })

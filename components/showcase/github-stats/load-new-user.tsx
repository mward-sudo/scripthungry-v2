import type { Dispatch, ReactElement, SetStateAction } from 'react'
import type { GithubApiResponse } from '../../../lib/github-types'

type LoadNewUser = {
  (props: {
    setResponseState: Dispatch<SetStateAction<GithubApiResponse>>
    responseState: GithubApiResponse
  }): ReactElement<any, any>
}

const fetchUser = async (username: string): Promise<GithubApiResponse> => {
  const response = await fetch(`/api/github/${username}`)
  return (await response.json()) as GithubApiResponse
}

export const LoadNewUser: LoadNewUser = ({
  responseState,
  setResponseState,
}) => (
  <div className="my-8 text-2xl text-center">
    <input
      className="p-2 mr-4 text-gray-800 rounded border-2 border-black"
      id="username"
      type="text"
      value={responseState.user?.login}
    />
    <button
      className="p-2 px-4 rounded-lg cursor-pointer bg-primary"
      onClick={async () =>
        setResponseState(
          await fetchUser(
            (document.getElementById('username') as HTMLInputElement).value
          )
        )
      }
    >
      Load GitHub user stats
    </button>
  </div>
)

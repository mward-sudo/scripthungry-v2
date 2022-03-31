import type { ReactElement } from 'react'
import type { GithubApiError } from '../../../lib/github-types'

type Errors = {
  (props: { errors: GithubApiError[] }): ReactElement<any, any>
}

export const Errors: Errors = ({ errors }) => (
  <div className="p-4 mt-8 mb-24 text-center text-black bg-red-300 border-2 border-red-800">
    <h2 className="text-2xl font-bold">Error</h2>
    <ul>
      {errors.map((error) => (
        <li key={error.message}>{error.message}</li>
      ))}
    </ul>
  </div>
)

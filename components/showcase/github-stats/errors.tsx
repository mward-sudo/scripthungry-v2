import type { ReactElement } from 'react'
import type { GithubApiError } from '../../../lib/github-types'
import { MdOutlineErrorOutline } from 'react-icons/md'

type Errors = {
  (props: { errors: GithubApiError[] }): ReactElement<any, any>
}

export const Errors: Errors = ({ errors }) => (
  <div className="p-4 mt-8 mb-24 text-black bg-red-300 border-2 border-red-800">
    <div className="flex gap-6 items-center">
      <MdOutlineErrorOutline className="text-7xl" />
      <div>
        <h2 className="text-2xl font-bold">Error</h2>
        <ul>
          {errors.map((error) => (
            <li key={error.message}>{error.message}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
)

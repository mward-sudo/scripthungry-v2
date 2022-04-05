import type { FormEventHandler } from 'react'

export const LoadNewUser = ({
  login,
  reloadData,
}: {
  login?: string
  reloadData: FormEventHandler<HTMLFormElement>
}) => (
  <form
    className="items-center mt-8 lg:mt-0 lg:items-end form-control"
    onSubmit={reloadData}
  >
    <label className="w-auto input-group">
      <span className="hidden sm:flex">Username</span>
      <input
        type="text"
        placeholder={login}
        id="username"
        className="w-64 text-lg input input-bordered"
      />
      <button className="btn btn-square" type="submit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <span className="sr-only">Search</span>
      </button>
    </label>
  </form>
)

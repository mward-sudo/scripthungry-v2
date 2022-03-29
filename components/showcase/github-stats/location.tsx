import type { ReactElement } from 'react'

type Location = {
  (props: { location: string | null }): ReactElement<any, any> | null
}

export const Location: Location = ({ location }) =>
  location ? <p className="text-sm text-center">Located in {location}</p> : null

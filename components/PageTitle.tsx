import type { ReactNode, ReactElement } from 'react'

interface PageTitle {
  (props: { children: ReactNode }): ReactElement<any, any>
}

const PageTitle: PageTitle = ({ children }) => (
  <h1 className="text-4xl font-bold sm:text-5xl font-display">{children}</h1>
)

export default PageTitle

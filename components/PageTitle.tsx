import type { FC } from 'react'
import { ReactChild } from 'react'

type PagetitleProps = {
  children: ReactChild
}

const PageTitle: FC = ({ children }) => (
  <h1 className="text-5xl font-bold font-display">{children}</h1>
)

export default PageTitle

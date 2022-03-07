import type { ReactElement, ReactNode } from 'react'

interface FullWidthEscape {
  (props: { children: ReactNode }): ReactElement<any, any>
}

const FullWidthEscape: FullWidthEscape = ({ children }) => (
  <div className="left-[50%] mx-[-50%] max-w-[100vw] relative right-[50%] w-[100vw]">
    {children}
  </div>
)

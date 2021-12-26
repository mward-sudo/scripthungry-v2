import type { FC } from 'react'

const FullWidthEscape: FC = ({ children }) => (
  <div className="left-[50%] mx-[-50%] max-w-[100vw] relative right-[50%] w-[100vw]">
    {children}
  </div>
)

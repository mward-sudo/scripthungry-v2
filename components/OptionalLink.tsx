import type { ReactElement, ReactNode } from 'react'

import Link from 'next/link'

interface OptionalLink {
  (props: { href?: string | undefined; children: ReactNode }): ReactElement<
    any,
    any
  >
}

const OptionalLink: OptionalLink = ({ href, children }) =>
  href ? (
    <Link href={href}>
      <a>{children}</a>
    </Link>
  ) : (
    <>{children}</>
  )

export default OptionalLink

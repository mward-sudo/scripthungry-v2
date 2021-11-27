import type { FC } from 'react'

import Link from 'next/link'

type OptionalLinkProps = {
  href?: string | undefined
}

const OptionalLink: FC<OptionalLinkProps> = ({ href, children }) =>
  href ? (
    <Link href={href}>
      <a>{children}</a>
    </Link>
  ) : (
    <>{children}</>
  )

export default OptionalLink

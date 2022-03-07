import type { ReactElement } from 'react'

import Link from 'next/link'

interface SiteTitle {
  (): ReactElement<any, any>
}

const SiteTitle: SiteTitle = () => (
  <h1 className="text-2xl font-display">
    <Link href="/">
      <a>scriptHungry</a>
    </Link>
  </h1>
)

export default SiteTitle

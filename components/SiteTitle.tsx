import type { ReactElement } from 'react'

import Link from 'next/link'

interface SiteTitle {
  (): ReactElement<any, any>
}

const SiteTitle: SiteTitle = () => (
  <h1 className="p-2 px-4 text-2xl rounded-box bg-base-200 font-display">
    <Link href="/">
      <a>scriptHungry</a>
    </Link>
  </h1>
)

export default SiteTitle

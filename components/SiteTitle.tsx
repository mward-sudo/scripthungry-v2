import type { FC } from 'react'
import Link from 'next/link'

const SiteTitle: FC = () => (
  <h1 className="text-2xl font-display">
    <Link href="/">
      <a>scriptHungry</a>
    </Link>
  </h1>
)

export default SiteTitle

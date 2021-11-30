import type { FC } from 'react'

import { sanitize as sanitizer } from 'isomorphic-dompurify'

type SanitizedHtmlProps = {
  html: string
}

const SanitizedHtml: FC<SanitizedHtmlProps> = ({ html }) => (
  <div
    className="prose max-w-none"
    dangerouslySetInnerHTML={{ __html: sanitizer(html) }}
  ></div>
)

export default SanitizedHtml

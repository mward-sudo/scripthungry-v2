import type { ReactElement } from 'react'

import { sanitize as sanitizer } from 'isomorphic-dompurify'

interface SanitizedHtml {
  (props: { html: string }): ReactElement<any, any>
}

const SanitizedHtml: SanitizedHtml = ({ html }) => (
  <div
    className="max-w-none prose"
    dangerouslySetInnerHTML={{ __html: sanitizer(html) }}
  ></div>
)

export default SanitizedHtml

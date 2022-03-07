import type { ReactElement } from 'react'

import OptionalLink from '../OptionalLink'

interface PostTitle {
  (props: { slug?: string | undefined; title: string }): ReactElement<any, any>
}
const PostTitle: PostTitle = ({ slug, title }) => {
  let href: string | undefined
  if (slug) href = `/blog/post/${slug}`
  return (
    <h2 className="text-3xl md:text-4xl font-display">
      <OptionalLink href={href}>{title}</OptionalLink>
    </h2>
  )
}

export default PostTitle

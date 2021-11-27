import PostTitle from './PostTitle'
import PostImage from './PostImage'

import type { FC } from 'react'
import type { iPost } from '../../models/blog'
import ByLine from './ByLine'

type PostExcerptProps = {
  post: iPost
}
const PostExcerpt: FC<PostExcerptProps> = ({
  post: { slug, title, excerpt, author, coverImage },
}) => (
  <article className="my-16">
    <PostTitle slug={slug} title={title} />
    <PostImage slug={slug} coverImage={coverImage} />
    <p className="mt-4 text-base md:text-xl">{excerpt}</p>
    <ByLine author={author} />
  </article>
)

export default PostExcerpt

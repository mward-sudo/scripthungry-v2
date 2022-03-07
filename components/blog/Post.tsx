import type { ReactElement } from 'react'
import type { iPost } from '../../models/blog'

import { sanitize as sanitizer } from 'isomorphic-dompurify'

import PostImage from './PostImage'
import PostTitle from './PostTitle'

interface Post {
  (props: { post: iPost }): ReactElement<any, any>
}

const Post: Post = ({ post }) => (
  <article>
    <PostTitle title={post?.title} />
    <PostImage coverImage={post?.coverImage} />
    <div
      className="max-w-none prose prose-red dark:prose-invert"
      id="blog-post"
      dangerouslySetInnerHTML={{
        __html: sanitizer(post?.content?.html),
      }}
    />
  </article>
)

export default Post

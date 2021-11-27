import type { FC } from 'react'
import type { iPost } from '../../models/blog'
import { sanitize as sanitizer } from 'isomorphic-dompurify'
import PostImage from './PostImage'
import PostTitle from './PostTitle'

type PostProps = {
  post: iPost
}

const Post: FC<PostProps> = ({ post }) => (
  <article>
    <PostTitle title={post?.title} />
    <PostImage coverImage={post?.coverImage} />
    <div
      className="prose max-w-none prose-red dark:text-gray-300"
      id="blog-post"
      dangerouslySetInnerHTML={{
        __html: sanitizer(post?.content?.html),
      }}
    />
  </article>
)

export default Post

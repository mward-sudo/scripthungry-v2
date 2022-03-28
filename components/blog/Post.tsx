import type { ReactElement } from 'react'
import type { iPost } from '../../models/blog'

import { useEffect } from 'react'
import { sanitize as sanitizer } from 'isomorphic-dompurify'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'

// import 'highlight.js/styles/default.css'
import 'highlight.js/styles/github-dark.css'

import PostImage from './PostImage'
import PostTitle from './PostTitle'

hljs.registerLanguage('javascript', javascript)

interface Post {
  (props: { post: iPost }): ReactElement<any, any>
}

const Post: Post = ({ post }) => {
  useEffect(() => {
    hljs.configure({ languages: ['javascript'] })
    hljs.highlightAll()
  }, [])

  return (
    <article>
      <PostTitle title={post?.title} />
      <PostImage coverImage={post?.coverImage} />
      <div
        className="max-w-none prose prose-red dark:prose-invert prose-pre:bg-transparent prose-pre:p-0 prose-code:rounded-none prose-pre:whitespace-pre-wrap"
        id="blog-post"
        dangerouslySetInnerHTML={{
          __html: sanitizer(post?.content?.html),
        }}
      />
    </article>
  )
}

export default Post

import { PostTitle } from './PostTitle'
import { PostImage } from './PostImage'
import { ByLine } from './ByLine'
import type { IndexPostsQuery } from '../../generated/graphcms'

type PostExcerpt = {
  post: IndexPostsQuery['posts'][0]
}

export const PostExcerpt = ({
  post: { slug, title, excerpt, author, coverImage },
}: PostExcerpt) => (
  <article className="my-16">
    <PostTitle slug={slug} title={title} />
    <PostImage
      slug={slug}
      imageUrl={coverImage?.url}
      imageHeight={coverImage?.height}
      imageWidth={coverImage?.width}
    />
    <p className="mt-4 text-base md:text-xl">{excerpt}</p>
    <ByLine imageUrl={author?.picture?.url} name={author?.name} />
  </article>
)

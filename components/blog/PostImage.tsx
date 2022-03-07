import type { ReactElement } from 'react'
import type { iPicture } from '../../models/blog'

import Image from 'next/image'
import OptionalLink from '../OptionalLink'

interface PostImage {
  (props: {
    slug?: string | undefined
    coverImage: iPicture | undefined
  }): ReactElement<any, any>
}

const PostImage: PostImage = ({ slug, coverImage }) => {
  const href = slug ? `/blog/post/${slug}` : undefined
  return coverImage ? (
    <div className="mt-4">
      <OptionalLink href={href}>
        <a>
          <Image
            src={coverImage.url}
            height={coverImage.height}
            width={coverImage.width}
            alt=""
          />
        </a>
      </OptionalLink>
    </div>
  ) : (
    <></>
  )
}

export default PostImage

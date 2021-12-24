import type { FC } from 'react'
import type { iPicture } from '../../models/blog'

import Image from 'next/image'
import OptionalLink from '../OptionalLink'

type PostImageProps = {
  slug?: string | undefined
  coverImage: iPicture | undefined
}

const PostImage: FC<PostImageProps> = ({ slug, coverImage }) => {
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

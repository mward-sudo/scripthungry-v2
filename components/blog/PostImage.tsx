import Image from 'next/image'
import OptionalLink from '../OptionalLink'

type props = {
  slug?: string
  imageUrl?: string | null
  imageHeight?: number | null
  imageWidth?: number | null
}

export const PostImage = ({
  slug,
  imageUrl,
  imageHeight,
  imageWidth,
}: props) => {
  const href = slug ? `/blog/post/${slug}` : undefined
  return imageUrl && imageHeight && imageWidth ? (
    <div className="mt-4">
      <OptionalLink href={href}>
        <Image src={imageUrl} height={imageHeight} width={imageWidth} alt="" />
      </OptionalLink>
    </div>
  ) : null
}

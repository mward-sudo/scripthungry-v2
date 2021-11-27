import type { FC } from 'react'
import type { iPicture } from '../../models/blog'

import Image from 'next/image'

type AvatarProps = {
  avatar: iPicture
  size?: number
}

const Avatar: FC<AvatarProps> = ({ avatar, size = 40 }) => (
  <div
    className="box-content overflow-hidden border-4 border-gray-100 rounded-full shadow-md"
    style={{ height: size, width: size }}
  >
    <Image src={avatar.url} height={size} width={size} alt="" layout="fixed" />
  </div>
)

export default Avatar

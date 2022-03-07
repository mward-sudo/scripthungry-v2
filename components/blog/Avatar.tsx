import type { ReactElement } from 'react'
import type { iPicture } from '../../models/blog'

import Image from 'next/image'

interface Avatar {
  (props: { avatar: iPicture; size?: number }): ReactElement<any, any>
}

const Avatar: Avatar = ({ avatar, size = 40 }) => (
  <div
    className="box-content overflow-hidden rounded-full border-4 border-gray-100 shadow-md"
    style={{ height: size, width: size }}
  >
    <Image src={avatar.url} height={size} width={size} alt="" layout="fixed" />
  </div>
)

export default Avatar

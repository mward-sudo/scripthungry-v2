import type { ReactElement } from 'react'

import Image from 'next/image'

type Avatar = {
  (props: { avatar: string | null }): ReactElement<any, any> | null
}

export const Avatar: Avatar = ({ avatar }) =>
  avatar ? (
    <Image
      src={avatar}
      alt=""
      width={200}
      height={200}
      layout={'fixed'}
      className="rounded-lg"
    />
  ) : null

import type { FC } from 'react'
import type { iAuthor } from '../../models/blog'

import Avatar from './Avatar'

type ByLineProps = {
  author: iAuthor | undefined
}

const avatarSize = 40

const ByLine: FC<ByLineProps> = ({ author }) =>
  author ? (
    <p className="flex items-center justify-end mt-8 text-right opacity-75 gap gap-x-4 font-display">
      {author.picture && <Avatar avatar={author.picture} />}
      <div>
        <span className="sr-only">By</span> {author.name}
      </div>
    </p>
  ) : (
    <></>
  )

export default ByLine

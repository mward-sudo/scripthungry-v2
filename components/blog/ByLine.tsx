import type { ReactElement } from 'react'
import type { iAuthor } from '../../models/blog'

import Avatar from './Avatar'

interface ByLine {
  (props: { author: iAuthor | undefined }): ReactElement<any, any>
}

const avatarSize = 40

const ByLine: ByLine = ({ author }) =>
  author ? (
    <p className="flex gap-x-4 justify-end items-center mt-8 text-right opacity-75 gap font-display">
      {author.picture && <Avatar avatar={author.picture} />}
      <div>
        <span className="sr-only">By</span> {author.name}
      </div>
    </p>
  ) : (
    <></>
  )

export default ByLine

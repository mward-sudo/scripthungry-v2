import { Avatar } from './Avatar'

export const ByLine = ({
  imageUrl,
  name,
}: {
  imageUrl?: string
  name?: string
}) =>
  name || imageUrl ? (
    <div className="flex gap-x-4 justify-end items-center mt-8 text-right opacity-75 gap font-display">
      {imageUrl && <Avatar avatarUrl={imageUrl} />}
      {name && (
        <div>
          <span className="sr-only">By</span> {name}
        </div>
      )}
    </div>
  ) : null

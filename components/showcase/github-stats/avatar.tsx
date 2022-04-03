import Image from 'next/image'

export const Avatar = ({ avatar: avatarImageUrl }: { avatar?: string }) =>
  avatarImageUrl ? (
    <Image
      src={avatarImageUrl}
      alt=""
      width={200}
      height={200}
      layout={'fixed'}
      className="rounded-lg"
    />
  ) : null

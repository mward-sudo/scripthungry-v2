import Image from 'next/image'

export const Avatar = ({ avatar: avatarImageUrl }: { avatar?: string }) =>
  avatarImageUrl ? (
    <div className="avatar">
      <div className="w-52 rounded-xl">
        <Image
          src={avatarImageUrl}
          alt=""
          width={208}
          height={208}
          layout={'fixed'}
          className="rounded-lg"
          priority={true}
        />
      </div>
    </div>
  ) : null

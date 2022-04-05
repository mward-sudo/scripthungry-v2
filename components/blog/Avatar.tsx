import Image from 'next/image'

export const Avatar = ({
  avatarUrl,
  size = 40,
}: {
  avatarUrl: string
  size?: number
}) => (
  <div
    className="box-content overflow-hidden rounded-full border-4 border-gray-100 shadow-md"
    style={{ height: size, width: size }}
  >
    <Image src={avatarUrl} height={size} width={size} alt="" layout="fixed" />
  </div>
)

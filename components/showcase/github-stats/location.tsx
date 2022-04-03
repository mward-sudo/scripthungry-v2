export const Location = ({ location = '' }: { location?: string | null }) =>
  location ? <p className="text-sm text-center">Located in {location}</p> : null

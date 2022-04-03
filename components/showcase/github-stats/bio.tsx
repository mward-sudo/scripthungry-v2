export const Bio = ({ bio = '' }) =>
  bio ? <p className="mb-8 text-xl italic bold">{bio}</p> : null

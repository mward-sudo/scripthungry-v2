type props = {
  stats: {
    label: string
    value?: number
  }[]
}

export const Stats = ({ stats }: props) => {
  return (
    <div className="flex flex-row flex-wrap gap-8 justify-center mt-8">
      {stats.map(({ label, value }, i) => (
        <div
          className="p-2 py-4 min-w-[9.5rem] border-t-2 border-neutral-content"
          key={`stat-${i}`}
        >
          <div className="stat-title">{label}</div>
          <div className="stat-value text-primary">{value}</div>
        </div>
      ))}
    </div>
  )
}

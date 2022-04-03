export const Company = ({ company }: { company?: string | null }) =>
  company ? <p className="mb-8 textext-lg">Working for {company}</p> : null

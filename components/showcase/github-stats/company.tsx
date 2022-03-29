import type { ReactElement } from 'react'

type Company = {
  (props: { company: string | null }): ReactElement<any, any> | null
}

export const Company: Company = ({ company }) =>
  company ? <p className="mb-8 textext-lg">Working for {company}</p> : null

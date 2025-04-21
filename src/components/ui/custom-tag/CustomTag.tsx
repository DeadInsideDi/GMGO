import { FC } from 'react'
import './CustomTag.scss'

export type TCustomTagProps = {
  text?: string
  children?: React.ReactNode
}

export const CustomTag: FC<TCustomTagProps> = ({ text, children }: TCustomTagProps) => {
  return (
    <span className='custom-tag'>
      <span>#</span>
      <span>{text}</span>
      {children}
    </span>
  )
}

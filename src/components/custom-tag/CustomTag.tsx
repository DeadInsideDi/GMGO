import { FC } from 'react'
import './CustomTag.scss'

export type TCustomTagProps = {
  text: string
}

export const CustomTag: FC<TCustomTagProps> = ({ text }: TCustomTagProps) => {
  return (
    <span className='custom-tag'>
      <span>#</span>
      <span>{text}</span>
    </span>
  )
}

import Image from 'next/image'
import { FC } from 'react'
import { compactNumber } from '../../../utils/numberUtils'
import './ViewsBlock.scss'

export type TViewsBlockProps = {
  views: number
}

export const ViewsBlock: FC<TViewsBlockProps> = ({ views }: TViewsBlockProps) => {
  return (
    <samp className='views-block'>
      <Image
        src='/eye.svg'
        width={18}
        height={18}
        alt='views'
      />
      {compactNumber(views)}
    </samp>
  )
}

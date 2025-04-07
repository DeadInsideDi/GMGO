import Link from 'next/link'
import { FC } from 'react'
import { stringArticlesByInt } from '../../utils/stringUtils'
import { CustomTag } from '../custom-tag/CustomTag'
import './DiscussCategory.scss'
import { TCategoryItem } from '../category/category.data'

export type TDiscussCategoryProps = {
  discussCategory: TCategoryItem
}

export const DiscussCategory: FC<TDiscussCategoryProps> = ({
  discussCategory: { name, usageCount },
}: TDiscussCategoryProps) => {
  return (
    <Link
      href='/'
      className='discuss-category'>
      <CustomTag text={name} />
      <span className='usage-count'>{stringArticlesByInt(usageCount)}</span>
    </Link>
  )
}

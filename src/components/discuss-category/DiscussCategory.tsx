import Link from 'next/link'
import { FC } from 'react'
import { stringArticlesByInt } from '../../utils/stringUtils'
import { TCategoryItem } from '../category/category.data'
import { CustomTag } from '../ui/custom-tag/CustomTag'
import './DiscussCategory.scss'

export type TDiscussCategoryProps = {
  discussCategory: TCategoryItem
}

export const DiscussCategory: FC<TDiscussCategoryProps> = ({
  discussCategory: { name, usageCount, href },
}: TDiscussCategoryProps) => {
  return (
    <Link
      href={href}
      className='discuss-category primary-tag'>
      <CustomTag text={name} />
      <span className='usage-count'>{stringArticlesByInt(usageCount)}</span>
    </Link>
  )
}

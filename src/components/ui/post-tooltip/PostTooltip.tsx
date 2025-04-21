import Link from 'next/link'
import { FC } from 'react'
import { CATEGORY_ROUTE } from '../../../constants'
import { useCategoryStore } from '../../../store/category.store'
import { CustomTag } from '../custom-tag/CustomTag'
import './PostTooltip.scss'

export type TPostTooltipProps = {
  categories: number[]
}

export const PostTooltip: FC<TPostTooltipProps> = ({ categories }) => {
  const { getCategoryById } = useCategoryStore()
  if (categories.length === 0) return null

  return (
    <div className='tooltip'>
      <button className='primary-tag'>+{categories.length}</button>
      <div className='tooltip__content'>
        {categories.map(categoryId => {
          return (
            <Link
              key={categoryId}
              href={`${CATEGORY_ROUTE}${categoryId}`}
              className='primary-tag'>
              <CustomTag text={getCategoryById(categoryId)?.name} />
            </Link>
          )
        })}
      </div>
    </div>
  )
}

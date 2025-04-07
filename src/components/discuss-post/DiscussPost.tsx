'use client'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { useCategoryStore } from '../../store/category.store'
import { compactNumber } from '../../utils/numberUtils'
import './DiscussPost.scss'
import { TDiscussPost } from './discuss-post.data'

export type TDiscussPostProps = {
  discussPost: TDiscussPost
}
export const DiscussPost: FC<TDiscussPostProps> = ({
  discussPost: { id, title, comments, views, categoryId },
}: TDiscussPostProps) => {
  const { getCategoryById } = useCategoryStore()
  return (
    <Link
      href={`/article/${id}`}
      className='discuss-post'>
      {title}
      <div className='discuss-post__details'>
        <span className='discuss-post__comments'>
          <Image
            src='/chat-circle.svg'
            width={18}
            height={18}
            alt='comments'
          />
          {comments}
        </span>
        <span className='discuss-post__views'>
          <Image
            src='/eye.svg'
            width={18}
            height={18}
            alt='views'
          />
          {compactNumber(views)}
        </span>
        <span className='discuss-post__category'>{getCategoryById(categoryId)?.name}</span>
      </div>
    </Link>
  )
}

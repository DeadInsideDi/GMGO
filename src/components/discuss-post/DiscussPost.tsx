'use client'
import Link from 'next/link'
import { FC } from 'react'
import { ChatCircle } from '../../../public'
import { useCategoryStore } from '../../store/category.store'
import { ViewsBlock } from '../ui/views-block/ViewsBlock'
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
          <ChatCircle
            width={18}
            height={18}
            alt='comments'
          />
          {comments}
        </span>
        <ViewsBlock views={views} />
        <span className='discuss-post__category'>{getCategoryById(categoryId)?.name}</span>
      </div>
    </Link>
  )
}

'use client'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { useCategoryStore } from '../../store/category.store'
import './NewsFeed.scss'
import { TNewsFeed } from './news-feed.data'

export type TPostProps = {
  post: TNewsFeed
}

export const Post: FC<TPostProps> = ({
  post: { id, categoryIds, authorId, title, content, timeUnix, image, likes, dislikes, comments, views },
}: TPostProps) => {
  const { getCategoryById } = useCategoryStore()
  const mainCategory = getCategoryById(categoryIds[0])
  return (
    <div className='post'>
      <div className='post__category'>
        <Link href={mainCategory?.href || '/'}>
          <Image
            src={mainCategory?.image || '/not-found-avatar.jpg'}
            alt={mainCategory?.name || ''} // NOT CORRECT
            width={13.33}
            height={13.33}
          />
        </Link>
      </div>
    </div>
  )
}

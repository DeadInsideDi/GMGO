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
        <Link
          href={mainCategory?.href || '/'}
          className='post__category__link'>
          <Image
            className='post__category__image'
            src={mainCategory?.image || '/not-found-avatar.jpg'}
            alt={mainCategory?.name || ''}
            width={13.33}
            height={13.33}
          />
        </Link>
        Дизайн
      </div>
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  )
}

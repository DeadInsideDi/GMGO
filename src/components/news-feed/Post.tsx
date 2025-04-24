'use client'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useEffect, useRef, useState } from 'react'
import { RoundedArrowDown } from '../../../public'
import { AUTHOR_ROUTE, CATEGORY_ROUTE, DEFAULT_AUTHOR_IMAGE, DEFAULT_AUTHOR_NAME, HOME_ROUTE } from '../../constants'
import { useAppStore } from '../../store/app.store'
import { useAuthorStore } from '../../store/author.store'
import { useCategoryStore } from '../../store/category.store'
import { formatDate } from '../../utils/numberUtils'
import { PostActions } from '../post-actions/PostActions'
import { CustomTag } from '../ui/custom-tag/CustomTag'
import { PostTooltip } from '../ui/post-tooltip/PostTooltip'
import { ViewsBlock } from '../ui/views-block/ViewsBlock'
import './NewsFeed.scss'
import { TNewsFeed } from './news-feed.data'

export type TPostProps = {
  post: TNewsFeed
}

export const Post: FC<TPostProps> = ({
  post: { id, categoryIds, authorId, title, content, timeUnix, image, likes, dislikes, comments, views },
}: TPostProps) => {
  const postRef = useRef<HTMLDivElement>(null)
  const [categories, setCategories] = useState<[number[], number[]]>([[], []])
  const { isMobile } = useAppStore()
  const { getCategoryById } = useCategoryStore()
  const mainCategory = getCategoryById(categoryIds[0])
  const { getAuthorById } = useAuthorStore()
  const author = getAuthorById(authorId)

  useEffect(() => {
    const handlePostResize = () => {
      if (!postRef.current) return
      let freeSpace = (postRef.current.getBoundingClientRect().width || 300) - 220 // computed
      const showedCategoryIds: number[] = []
      const hiddenCategoryIds: number[] = []

      categoryIds.forEach(id => {
        const categoryName = getCategoryById(id)?.name
        freeSpace -= (categoryName?.length || 0) * 7 + 32 // computed
        if (freeSpace > 0) showedCategoryIds.push(id)
        else hiddenCategoryIds.push(id)
      })
      setCategories([showedCategoryIds, hiddenCategoryIds])
    }
    window.addEventListener('resize', handlePostResize)
    setTimeout(handlePostResize, 500)
    return () => window.removeEventListener('resize', handlePostResize)
  }, [window])

  return (
    <div
      className='post'
      ref={postRef}>
      <Link
        href={mainCategory?.href || HOME_ROUTE}
        className='category'>
        <div className='image-container'>
          <Image
            src={mainCategory?.image || DEFAULT_AUTHOR_IMAGE}
            alt={mainCategory?.name || ''}
            width={isMobile ? 11 : 13} // float nums do not supported by most browsers
            height={isMobile ? 11 : 13}
          />
        </div>
        {mainCategory?.name}
      </Link>
      <h3>{title}</h3>
      <p>{content}</p>
      <div className='author-article'>
        <Link href={`${AUTHOR_ROUTE}${authorId}`}>
          <Image
            src={author?.avatar || DEFAULT_AUTHOR_IMAGE}
            alt={author?.name || ''}
            width={32}
            height={32}
          />
          <span>{author?.fullName || DEFAULT_AUTHOR_NAME}</span>
        </Link>
        <span className='date'>{formatDate(timeUnix)}</span>
      </div>
      <Image
        src={image}
        alt='image'
        fill
        sizes='50vw'
        priority={false}
      />
      <PostActions {...{ id, likes, dislikes, comments }} />
      <div className='info'>
        <div className='tags'>
          {categories[0].map(categoryId => {
            return (
              <Link
                key={categoryId}
                href={`${CATEGORY_ROUTE}${categoryId}`}
                className='primary-tag'>
                <CustomTag text={getCategoryById(categoryId)?.name} />
              </Link>
            )
          })}
          <PostTooltip categories={categories[1]} />
        </div>
        <div className='views'>
          <ViewsBlock views={views} />
          <RoundedArrowDown
            alt='arrow'
            width={18}
            height={18}
          />
        </div>
      </div>
    </div>
  )
}

'use client'
import { FC, useEffect, useState } from 'react'
import { ArrowRightCarousel } from '../../../public'
import { useAccountStore } from '../../store/account.store'
import { useAppStore } from '../../store/app.store'
import { useCategoryStore } from '../../store/category.store'
import { usePostsStore } from '../../store/posts.store'
import { DiscussCategory } from '../discuss-category/DiscussCategory'
import { DiscussPost } from '../discuss-post/DiscussPost'
import './SocialBar.scss'

export type TSocialBarProps = {}

export const SocialBar: FC<TSocialBarProps> = ({}: TSocialBarProps) => {
  const { currentPosts } = usePostsStore()
  const { selectTopCategories } = useCategoryStore()
  const { isLoggedIn } = useAccountStore()
  const { isMobile } = useAppStore()
  const [completionProgress, setCompletionProgress] = useState(50) // not in state

  // HydrationWarning
  const [isClient, setIsClient] = useState(false)
  useEffect(() => setIsClient(true), [])
  if (!isClient) return null
  // HydrationWarning
  const getRandom = (prev: number, index: number) =>
    Math.max(Math.min(prev + ~~(Math.random() * 50 - 25 * index), 100), 0)

  if (isMobile) return null
  return (
    <div className='social-bar'>
      {isLoggedIn() && (
        <section aria-label='profile completion'>
          <div className='outer-list'>
            <ul>
              <div
                role='progressbar'
                aria-label='profile completion'>
                <svg
                  viewBox='0 0 250 250'
                  className='circular-progress'
                  style={{ '--progress': `${completionProgress}` } as React.CSSProperties}>
                  <circle className='bg'></circle>
                  <circle className='fg'></circle>
                </svg>
                <samp>{completionProgress}%</samp>
                <h3>Заполненность профиля</h3>
              </div>
              {['Загрузите фотографию профиля', 'Добавьте обложку', 'Расскажите о себе', 'Подпишитесь на темы'].map(
                (item, index) => (
                  <div key={index}>
                    {item}
                    <button onClick={() => setCompletionProgress(prev => getRandom(prev, index))}>
                      <ArrowRightCarousel alt='arrow' />
                    </button>
                  </div>
                ),
              )}
            </ul>
          </div>
        </section>
      )}

      <section aria-label='discussed'>
        <h3>ОБСУЖДАЕМОЕ</h3>
        <ul>
          {currentPosts.map(post => (
            <DiscussPost
              key={post.id}
              discussPost={post}
            />
          ))}
        </ul>
      </section>
      <section aria-label='topics'>
        <h3>АКТУАЛЬНОЕ</h3>

        <div className='outer-list'>
          <ul>
            {selectTopCategories(5).map(category => (
              <DiscussCategory
                key={category.id}
                discussCategory={category}
              />
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}

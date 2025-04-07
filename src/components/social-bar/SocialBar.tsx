'use client'
import { FC } from 'react'
import { useCategoryStore } from '../../store/category.store'
import { usePostsStore } from '../../store/posts.store'
import { DiscussCategory } from '../discuss-category/DiscussCategory'
import { DiscussPost } from '../discuss-post/DiscussPost'
import './SocialBar.scss'

export type TSocialBarProps = {}

export const SocialBar: FC<TSocialBarProps> = ({}: TSocialBarProps) => {
  const { currentPosts } = usePostsStore()
  const { selectTopCategories } = useCategoryStore()

  return (
    <div className='social-bar'>
      {/* AUTH */}
      {/* <h1>SocialBar</h1> */}

      <section
        className='social-container'
        data-aria-label='discussed'>
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
      <section
        className='social-container'
        data-aria-label='topics'>
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

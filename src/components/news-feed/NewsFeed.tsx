'use client'
import { FC } from 'react'
import { useAppStore } from '../../store/app.store'
import { usePostsStore } from '../../store/posts.store'
import './NewsFeed.scss'
import { Post } from './Post'

export type TNewsFeedProps = {}

export const NewsFeed: FC<TNewsFeedProps> = ({}: TNewsFeedProps) => {
  const { postsFilterState, setPostsFilterState } = useAppStore()
  const { sortPostsByFilterState } = usePostsStore()

  return (
    <div className='news-feed'>
      <div className='filter'>
        <button
          onClick={() => setPostsFilterState('Popular')}
          className={`${postsFilterState === 'Popular' ? 'is-active' : ''}`}>
          Популярное
        </button>
        <button
          onClick={() => setPostsFilterState('Latest')}
          className={`${postsFilterState === 'Latest' ? 'is-active' : ''}`}>
          Свежее
        </button>
        <button
          onClick={() => setPostsFilterState('My Subscriptions')}
          className={`${postsFilterState === 'My Subscriptions' ? 'is-active' : ''}`}>
          Мои подписки
        </button>
      </div>

      <div className='posts'>
        {sortPostsByFilterState(postsFilterState).map(post => (
          <Post
            key={post.id}
            post={post}
          />
        ))}
      </div>
    </div>
  )
}

'use client'
import { FC } from 'react'
import { useAccountStore } from '../../store/account.store'
import { usePostsStore } from '../../store/posts.store'
import './NewsFeed.scss'
import { Post } from './Post'

export type TNewsFeedProps = {}

export const NewsFeed: FC<TNewsFeedProps> = ({}: TNewsFeedProps) => {
  const { currentNews } = usePostsStore()
  const { postsFilterState, setPostsFilterState } = useAccountStore()
  return (
    <div className='news-feed'>
      <div className='news-feed__filter'>
        <button
          onClick={() => setPostsFilterState('Popular')}
          className={`${postsFilterState === 'Popular' ? 'active' : ''}`}>
          Популярное
        </button>
        <button
          onClick={() => setPostsFilterState('Latest')}
          className={`${postsFilterState === 'Latest' ? 'active' : ''}`}>
          Свежее
        </button>
        <button
          onClick={() => setPostsFilterState('My Subscriptions')}
          className={`${postsFilterState === 'My Subscriptions' ? 'active' : ''}`}>
          Мои подписки
        </button>
      </div>
      <div className='news-feed__posts'>
        {currentNews.map(post => (
          <Post
            key={post.id}
            post={post}
          />
        ))}
      </div>
    </div>
  )
}

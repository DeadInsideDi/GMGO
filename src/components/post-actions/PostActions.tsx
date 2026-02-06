'use client'
import Image from 'next/image'
import { FC } from 'react'
import { Bookmark, ChatCircle, Like } from '../../../public'
import { useAccountStore } from '../../store/account.store'
import { useAppStore } from '../../store/app.store'
import './PostActions.scss'

export type TPostActionsProps = {
  id: number
  likes: number
  dislikes: number
  comments: number
}

export const PostActions: FC<TPostActionsProps> = ({ id, likes, dislikes, comments }: TPostActionsProps) => {
  const { isLikedPost, isDislikedPost, isFavoritePost, toggleLikePost, toggleDislikePost, toggleFavoritePost } =
    useAccountStore()
  const { isMobile } = useAppStore()
  return (
    <div className='actions'>
      <button
        type='button'
        aria-label='like'
        onClick={() => toggleLikePost(id)}
        className={`like-button${isLikedPost(id) ? ' is-active' : ''}`}>
        <Like
          width={20}
          height={20}
          alt='like'
        />
        {likes}
      </button>
      <button
        type='button'
        aria-label='dislike'
        onClick={() => toggleDislikePost(id)}
        className={`dislike-button${isDislikedPost(id) ? ' is-active' : ''}`}>
        <Like
          width={20}
          height={20}
          alt='dislike'
        />
        {dislikes}
      </button>
      <button
        type='button'
        aria-label='comment'
        className='comment-button'>
        <ChatCircle
          width={20}
          height={20}
          alt='comment'
        />
        {comments}
      </button>
      {isMobile ? (
        <>
          <button
            type='button'
            aria-label='share'
            className='share-button'>
            <Image
              width={20}
              height={20}
              alt='share'
              src={'/share-network.svg'}
            />
          </button>
          <button
            type='button'
            aria-label='favorite'
            onClick={() => toggleFavoritePost(id)}
            className={`favorite-button${isFavoritePost(id) ? ' is-active' : ''}`}>
            <Bookmark
              width={20}
              height={20}
              alt='favorite'
            />
          </button>
        </>
      ) : (
        <button
          type='button'
          aria-label='share'
          className='share-button'>
          <Image
            width={20}
            height={20}
            alt='share'
            src={'/share-network.svg'}
          />
          Поделиться
        </button>
      )}

      {isMobile ? (
        <button
          type='button'
          aria-label='getMoreInfo'
          onClick={() => console.log('simulate more info')}
          className='more-info-button'>
          <Image
            src='/dots.svg'
            alt='more info'
            width={18}
            height={18}
          />
        </button>
      ) : (
        <button
          type='button'
          aria-label='favorite'
          onClick={() => toggleFavoritePost(id)}
          className={`favorite-button${isFavoritePost(id) ? ' is-active' : ''}`}>
          <Bookmark
            width={24}
            height={24}
            alt='favorite'
          />
        </button>
      )}
    </div>
  )
}

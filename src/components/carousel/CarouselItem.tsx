'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { DEFAULT_AUTHOR_IMAGE, DEFAULT_AUTHOR_NAME } from '../../constants'
import { useAccountStore } from '../../store/account.store'
import { useAppStore } from '../../store/app.store'
import { useAuthorStore } from '../../store/author.store'
import { TCarousel } from './carousel.data'

export type TCardOverlayProps = {
  avatar?: string
  name?: string
}

export const CardOverlay: FC<TCardOverlayProps> = ({ avatar, name }) => {
  return (
    <div className='card__overlay'>
      <Image
        width={52}
        height={52}
        src={avatar || DEFAULT_AUTHOR_IMAGE}
        alt='avatar'
      />
      <span>{name || DEFAULT_AUTHOR_NAME}</span>
    </div>
  )
}

export type TCarouselItemProps = {
  item: TCarousel
}

export const CarouselItem: FC<TCarouselItemProps> = ({
  item: { id, backgroundImage, authorId },
}: TCarouselItemProps) => {
  const router = useRouter()
  const [mouseIsDown, setMouseIsDown] = useState(false)
  const { isMobile } = useAppStore()
  const [mouseMovedWhileDownBy, setMouseMovedWhileDownBy] = useState(0)
  const { isViewedStory, setViewedStory } = useAccountStore()
  const { getAuthorById } = useAuthorStore()
  const author = getAuthorById(authorId)

  const isLeftMouseButton = (button: number) => button === 0

  const mouseUpHandler: React.MouseEventHandler<HTMLDivElement> = e => {
    if (!isLeftMouseButton(e.button)) return
    if (mouseMovedWhileDownBy < 3 && mouseIsDown) {
      setViewedStory(id)
      router.push(`/stories/${id}`)
    }

    setMouseIsDown(false)
    setMouseMovedWhileDownBy(0)
  }
  const mouseDownHandler: React.MouseEventHandler<HTMLDivElement> = e =>
    isLeftMouseButton(e.button) && setMouseIsDown(true)
  const mouseMoveHandler: React.MouseEventHandler<HTMLDivElement> = e =>
    mouseIsDown && setMouseMovedWhileDownBy(prevOffset => prevOffset + Math.abs(e.movementX))

  return (
    <div
      onMouseDown={mouseDownHandler}
      onMouseMove={mouseMoveHandler}
      onMouseUp={mouseUpHandler}
      className={`card${isViewedStory(id) ? ' card--viewed' : ''}`}>
      {isMobile ? (
        <CardOverlay
          avatar={author?.avatar}
          name={author?.name}
        />
      ) : (
        <>
          <Image
            width={103.48}
            height={183.02}
            src={backgroundImage}
            alt='background'
            className='card__background'
            priority={false}
          />
          <div className='card__gradient' />
          <CardOverlay
            avatar={author?.avatar}
            name={author?.name}
          />
        </>
      )}
    </div>
  )
}

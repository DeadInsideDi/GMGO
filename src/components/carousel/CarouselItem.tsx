'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { Ellipse } from '../../../public'
import { useAccountStore } from '../../store/account.store'
import { useAuthorStore } from '../../store/author.store'
import { TCarousel } from './carousel.data'

export type TCarouselItemProps = {
  item: TCarousel
}

export const CarouselItem: FC<TCarouselItemProps> = ({
  item: { id, backgroundImage, authorId },
}: TCarouselItemProps) => {
  const router = useRouter()
  const [mouseIsDown, setMouseIsDown] = useState(false)
  const [mouseMovedWhileDownBy, setMouseMovedWhileDownBy] = useState(0)
  const { isViewedStory } = useAccountStore()
  const { getAuthorById } = useAuthorStore()
  const author = getAuthorById(authorId)

  const isLeftMouseButton = (button: number) => button === 0

  const mouseUpHandler: React.MouseEventHandler<HTMLDivElement> = e => {
    if (!isLeftMouseButton(e.button)) return
    if (mouseMovedWhileDownBy < 3 && mouseIsDown) {
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
      <Image
        width={103.48}
        height={183.02}
        src={backgroundImage}
        alt='background'
        className='card__background'
        priority={false}
      />
      <div className='card__gradient' />
      <div className='card__overlay'>
        <Image
          width={41.27}
          height={41.27}
          src={author?.avatar || '/not-found-avatar.jpg'}
          alt='avatar'
          className='card__avatar'
        />
        <Ellipse className='card__ellipse' />
        <span>{author?.name || 'Неизвестный'}</span>
      </div>
    </div>
  )
}

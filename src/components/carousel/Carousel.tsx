'use client'
import { FC, useEffect, useRef, useState } from 'react'
import { ArrowRightCarousel } from '../../../public'
import { useAppStore } from '../../store/app.store'
import { TCarousel } from '../carousel/carousel.data'
import { CarouselItem } from '../carousel/CarouselItem'
import './Carousel.scss'

export type TCarouselProps = {
  carouselData: TCarousel[]
}

export const Carousel: FC<TCarouselProps> = ({ carouselData }: TCarouselProps) => {
  const carouselCardsRef = useRef<HTMLDivElement>(null)
  const { isMobile } = useAppStore()
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [isScroll, setIsScroll] = useState<'scroll' | 'hidden'>('scroll')

  const buttonHandler = (direction: -1 | 1) => {
    carouselCardsRef.current!.scrollBy({
      left: carouselCardsRef.current!.clientWidth * direction,
      behavior: 'smooth',
    })
  }

  const mouseMoveHandler = (event: React.MouseEvent) => {
    if (!isMouseDown || !carouselCardsRef.current) return
    carouselCardsRef.current.scrollBy({ left: -event.movementX })
  }

  const scrollHandler = () => {
    if (!carouselCardsRef.current) return
    const { scrollLeft, scrollWidth, clientWidth, dataset } = carouselCardsRef.current
    dataset.scrollAt = scrollLeft === 0 ? 'start' : ~~(scrollLeft + clientWidth) + 3 >= scrollWidth ? 'end' : 'scroll'
  }

  useEffect(
    () =>
      window.addEventListener('mouseup', () => {
        setIsScroll('scroll')
        setIsMouseDown(false)
      }),
    [],
  )

  return (
    <div className='carousel'>
      <div
        ref={carouselCardsRef}
        onDragStart={e => e.preventDefault()}
        onMouseDown={e => {
          setIsScroll(e.buttons === 4 ? 'hidden' : 'scroll')
          setIsMouseDown(true)
        }}
        onMouseMove={mouseMoveHandler}
        onScroll={scrollHandler}
        style={{ overflowX: isScroll }}
        data-scroll-at='start'
        className='container'>
        {carouselData.map(item => (
          <CarouselItem
            key={item.id}
            item={item}
          />
        ))}
      </div>
      {!isMobile && (
        <>
          <button
            type='button'
            aria-label='previous'
            onClick={() => buttonHandler(-1)}
            className='prev'>
            <ArrowRightCarousel alt='arrow' />
          </button>
          <button
            type='button'
            aria-label='next'
            onClick={() => buttonHandler(1)}
            className='next'>
            <ArrowRightCarousel alt='arrow' />
          </button>
        </>
      )}
    </div>
  )
}

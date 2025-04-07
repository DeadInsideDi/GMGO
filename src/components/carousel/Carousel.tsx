'use client'
import Image from 'next/image'
import { FC, useEffect, useRef, useState } from 'react'
import { TCarousel } from '../carousel/carousel.data'
import { CarouselItem } from '../carousel/CarouselItem'
import './Carousel.scss'

export type TCarouselProps = {
  carouselData: TCarousel[]
}

export const Carousel: FC<TCarouselProps> = ({ carouselData }: TCarouselProps) => {
  const carouselCardsRef = useRef<HTMLDivElement>(null)
  const [isMouseDown, setIsMouseDown] = useState(false)

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

  useEffect(() => window.addEventListener('mouseup', () => setIsMouseDown(false)), [])

  return (
    <div className='carousel'>
      <div
        ref={carouselCardsRef}
        onDragStart={e => e.preventDefault()}
        onMouseDown={() => setIsMouseDown(true)}
        onMouseMove={mouseMoveHandler}
        onScroll={scrollHandler}
        data-scroll-at='start'
        className='carousel__container'>
        {carouselData.map(item => (
          <CarouselItem
            key={item.id}
            item={item}
          />
        ))}
      </div>
      <button
        onClick={() => buttonHandler(-1)}
        className='carousel__button carousel__button--prev'>
        <Image
          src='/arrow-right-carousel.svg'
          alt='arrow'
          width={24}
          height={24}
        />
      </button>
      <button
        onClick={() => buttonHandler(1)}
        className='carousel__button carousel__button--next'>
        <Image
          src='/arrow-right-carousel.svg'
          alt='arrow'
          width={24}
          height={24}
        />
      </button>
    </div>
  )
}

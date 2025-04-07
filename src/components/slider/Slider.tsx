'use client'

import Image from 'next/image'
import { FC, useRef, useState } from 'react'

import { TCarousel } from '../carousel/carousel.data'
import { CarouselItem } from '../carousel/CarouselItem'
import './Slider.scss'

export type TCarouselProps = {
  carouselData: TCarousel[]
}
// const mod = (a: number, b: number) => ((a % b) + b) % b
export const Slider: FC<TCarouselProps> = ({ carouselData }: TCarouselProps) => {
  const carouselCardsRef = useRef<HTMLDivElement>(null)
  const [isMouseDown, setIsMouseDown] = useState(false)

  const buttonHandler = (direction: 'previous' | 'forward') => {
    carouselCardsRef.current!.scrollBy({
      left: carouselCardsRef.current!.clientWidth * (direction === 'previous' ? -1 : 1),
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
    dataset.scrollAt =
      scrollLeft === 0 ? 'start' : Math.ceil(scrollLeft + clientWidth) >= scrollWidth ? 'end' : 'scroll'
  }

  // if (carouselCardsRef.current) carouselCardsRef.current.ondragstart = (event: DragEvent) => event.preventDefault()

  return (
    <div className='slider'>
      <div
        ref={carouselCardsRef}
        onDragStart={e => e.preventDefault()}
        onMouseDown={() => setIsMouseDown(true)}
        onMouseMove={mouseMoveHandler}
        onScroll={scrollHandler}
        data-scroll-at='start'
        className='slider__container'>
        {carouselData.map(item => (
          <CarouselItem
            key={item.id}
            item={item}
          />
        ))}
      </div>
      <button
        onClick={() => buttonHandler('previous')}
        className='slider__button slider__button-prev'>
        {/* <ArrowRight /> */}
        <Image
          src='/arrow-right-carousel.svg'
          alt='arrow'
          width={24}
          height={24}
        />
      </button>
      <button
        onClick={() => buttonHandler('forward')}
        className='slider__button slider__button-next'>
        <Image
          src='/arrow-right-carousel.svg'
          alt='arrow'
          width={24}
          height={24}
        />
        {/* <ArrowRight /> */}
      </button>
    </div>
  )
}

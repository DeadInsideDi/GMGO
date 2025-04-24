'use client'
import { FC, useEffect, useRef, useState } from 'react'
import { Category } from './Category'
import { TCategoryItem, generalCategory } from './category.data'
import './Category.scss'

export type TCategoriesProps = {
  categories: TCategoryItem[]
}

export const Categories: FC<TCategoriesProps> = ({ categories }: TCategoriesProps) => {
  const carouselCardsRef = useRef<HTMLDivElement>(null)
  const [isMouseDown, setIsMouseDown] = useState(false)

  const mouseMoveHandler = (event: React.MouseEvent) => {
    if (!isMouseDown || !carouselCardsRef.current) return
    carouselCardsRef.current.scrollBy({ left: -event.movementX })
  }
  useEffect(() => window.addEventListener('mouseup', () => setIsMouseDown(false)))

  return (
    <div
      ref={carouselCardsRef}
      onDragStart={e => e.preventDefault()}
      onMouseDown={() => setIsMouseDown(true)}
      onMouseMove={mouseMoveHandler}
      className='categories'>
      {[generalCategory].concat(categories).map(category => (
        <Category
          key={category.id}
          category={category}
        />
      ))}
    </div>
  )
}

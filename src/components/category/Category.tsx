'use client'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { FC, MouseEventHandler, useState } from 'react'
import './Category.scss'
import { TCategoryItem } from './category.data'

export type TCategoryProps = {
  category: TCategoryItem
}

export const Category: FC<TCategoryProps> = ({ category: { name, image, href } }: TCategoryProps) => {
  const router = useRouter()
  const [mouseIsDown, setMouseIsDown] = useState(false)
  const [mouseMovedWhileDownBy, setMouseMovedWhileDownBy] = useState(0)
  const pathname = usePathname()
  const isActive = pathname === href

  const isLeftMouseButton = (button: number) => button === 0

  const mouseUpHandler: MouseEventHandler<HTMLDivElement> = e => {
    if (!isLeftMouseButton(e.button)) return
    if (mouseMovedWhileDownBy < 3 && mouseIsDown) router.push(href)
    setMouseIsDown(false)
    setMouseMovedWhileDownBy(0)
  }

  return (
    <div
      onMouseDown={e => isLeftMouseButton(e.button) && setMouseIsDown(true)}
      onMouseMove={e => mouseIsDown && setMouseMovedWhileDownBy(prevOffset => prevOffset + Math.abs(e.movementX))}
      onMouseUp={mouseUpHandler}
      className={`category secondary-button${isActive ? ' secondary-button--active' : ''}`}>
      {image && (
        <Image
          src={image}
          alt={name}
          width={18}
          height={18}
        />
      )}
      {name}
    </div>
  )
}

'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'
import { TMenuItem } from '../menu-bar/menu.data'
import './Section.scss'

export type TSectionProps = {
  menuItem: TMenuItem
}

export const Section: FC<TSectionProps> = ({ menuItem: { title, image, href } }: TSectionProps) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      className={`section${isActive ? ' is-active' : ''}`}
      href={href}>
      {image}
      {title}
    </Link>
  )
}

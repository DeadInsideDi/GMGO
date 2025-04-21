'use client'
import Image from 'next/image'
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
      <Image
        src={image}
        alt={title}
        width={20}
        height={20}
      />
      {title}
    </Link>
  )
}

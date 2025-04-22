'use client'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import { useAppStore } from '../../store/app.store'
import { Footer } from '../footer/Footer'
import { Section } from '../section/Section'
import './MenuBar.scss'
import { menuSections } from './menu.data'

export const PublishButton: FC = () => {
  const { isMobile } = useAppStore()
  return (
    <button className='publish'>
      <Image
        src='/edit.svg'
        alt='publish'
        width={14}
        height={14}
      />
      {!isMobile && 'Опубликовать'}
    </button>
  )
}

export const MenuBar: FC = () => {
  const { burgerState } = useAppStore()
  // HydrationWarning
  const [isClient, setIsClient] = useState(false)
  useEffect(() => setIsClient(true), [])
  if (!isClient) return null
  // HydrationWarning
  return (
    <div
      className='menu-bar'
      aria-disabled={!burgerState}>
      <PublishButton />
      <div className='sections'>
        {menuSections.map(menuItem => (
          <Section
            key={menuItem.id}
            menuItem={menuItem}
          />
        ))}
      </div>
      <Footer />
    </div>
  )
}

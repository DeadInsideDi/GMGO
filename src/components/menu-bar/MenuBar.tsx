import Image from 'next/image'
import { FC } from 'react'
import { Section } from '../section/Section'
import './MenuBar.scss'
import { menuSections } from './menu.data'

export type TMenuBarProps = {}

export const MenuBar: FC<TMenuBarProps> = ({}: TMenuBarProps) => {
  return (
    <div className='menu-bar'>
      <button className='publish primary-button'>
        <Image
          src='/edit.svg'
          alt='publish'
          width={14}
          height={14}
        />
        Опубликовать
      </button>
      <div className='sections'>
        {menuSections.map(menuItem => (
          <Section
            key={menuItem.id}
            menuItem={menuItem}
          />
        ))}
      </div>
    </div>
  )
}

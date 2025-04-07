'use client'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useState } from 'react'
import { User } from '../../../public'
import './Header.scss'

export type THeaderProps = {}

export const Header: FC<THeaderProps> = ({}: THeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  return (
    <div className='header'>
      <div className='menu'>
        <Link
          href='/'
          className='logo'>
          <Image
            src='/logo.svg'
            alt='logo'
            width={124}
            height={45}
            priority={true}
          />
        </Link>
        <button className='burger'></button>
      </div>

      <div className='search'>
        <Link href={`/search?query=${encodeURIComponent(searchQuery)}`}>
          <Image
            src='/search.svg'
            alt='search'
            width={18}
            height={18}
            priority={true}
            className='search__image'
          />
        </Link>
        <input
          type='text'
          className='search__input'
          placeholder='Поиск'
          autoComplete='off'
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>

      <div className='account-container'>
        <button className='login primary-button'>
          <User
            className='login__image'
            stroke='#f7c5c1'
          />
          Войти
        </button>
      </div>
    </div>
  )
}

// <div className='search'>
//         {/* https://gmgo.ru/search?query=sadas */}

//         <Link href='{input text}'>
//           <Image
//             src='/search.svg'
//             alt='search'
//             width={18}
//             height={18}
//             priority={true}
//             className='search__image'
//           />
//         </Link>
//         <input
//           type='text'
//           className='search__input'
//           placeholder='Поиск'
//           autoComplete='off'
//         />
//       </div>

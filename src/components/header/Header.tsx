'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import { Bell, Envelope, User } from '../../../public'
import { SEARCH_ROUTE } from '../../constants'
import { useAccountStore } from '../../store/account.store'
import { useAppStore } from '../../store/app.store'
import { PublishButton } from '../menu-bar/MenuBar'
import { RegistrationDialog } from '../registration-dialog/RegistrationDialog'
import './Header.scss'

export type THeaderProps = {}

export const Header: FC<THeaderProps> = ({}: THeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const { isLoggedIn, account } = useAccountStore()
  const { isMobile } = useAppStore()
  const { toggleBurgerState, setIsMobileByWidth, setIsDialogOpen } = useAppStore()
  const router = useRouter()
  const renderAccount = () =>
    isLoggedIn() ? (
      <>
        {isMobile ? (
          <>
            <PublishButton />
            <Link
              href={'/me'} // not existing route
              className='account'>
              <Image
                src={account.avatar}
                alt='avatar'
                width={36}
                height={36}
              />
            </Link>
          </>
        ) : (
          <>
            <Link
              href={'/me'} // not existing route
              className='account'>
              <Image
                src={account.avatar}
                alt='avatar'
                width={48}
                height={48}
              />
            </Link>
            <Link
              href={'/messages'} // not existing route
              className='messages'>
              <Envelope
                alt='messages'
                width={24}
                height={24}
              />
              {account.privacyInfo.unreadMessages && (
                <span className='unread-messages'>{account.privacyInfo.unreadMessages}</span>
              )}
            </Link>
          </>
        )}
        <Link
          href={'/settings'} // not existing route
          className='settings'>
          <Bell
            alt='settings'
            width={24}
            height={24}
          />
        </Link>
      </>
    ) : (
      <button
        onClick={() => setIsDialogOpen(true)}
        className='login primary-button'>
        <User />
        Войти
      </button>
    )

  // +HydrationWarning
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
    const handleResize = () => setIsMobileByWidth(window.innerWidth)
    setIsMobileByWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isClient])

  if (!isClient) return null

  return (
    <>
      <RegistrationDialog />
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
          <button
            onClick={toggleBurgerState}
            className='burger'></button>
        </div>
        <div className='search'>
          <Link href={`${SEARCH_ROUTE}${encodeURIComponent(searchQuery)}`}>
            <Image
              src='/search.svg'
              alt='search'
              width={18}
              height={18}
              priority={true}
            />
          </Link>
          <input
            type='text'
            placeholder='Поиск'
            autoComplete='off'
            onKeyDown={e => e.key === 'Enter' && router.push(`${SEARCH_ROUTE}${encodeURIComponent(searchQuery)}`)}
            onChange={e => setSearchQuery(e.currentTarget.value)}
          />
        </div>
        <div className='account-container'>{renderAccount()}</div>
      </div>
    </>
  )
}

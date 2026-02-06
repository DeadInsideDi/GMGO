'use client'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import { Envelope } from '../../../public'
import { useAccountStore } from '../../store/account.store'
import { useAppStore } from '../../store/app.store'
import { Footer } from '../footer/Footer'
import { Section } from '../section/Section'
import './MenuBar.scss'
import { menuSections } from './menu.data'

export const PublishButton: FC = () => {
	const { isMobile } = useAppStore()
	return (
		<button
			type='button'
			aria-label='publish'
			className='publish'>
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
	const { burgerState, isMobile } = useAppStore()
	const {
		account: {
			privacyInfo: { unreadMessages },
		},
	} = useAccountStore()
	// HydrationWarning
	const [isClient, setIsClient] = useState(false)
	useEffect(() => setIsClient(true), [])
	if (!isClient) return null
	// HydrationWarning
	return isMobile ? (
		<div className='menu-bar-mobile'>
			{menuSections.slice(1, 3).map(menuItem => (
				<Section
					key={menuItem.id}
					menuItem={{ ...menuItem, title: '' }}
				/>
			))}
			<Link
				aria-label='Go to messages'
				href={'/messages'} // not designed route
				className='messages'>
				<Envelope
					alt='messages'
					width={24}
					height={24}
				/>
				{unreadMessages ? <span className='unread-messages'>{unreadMessages}</span> : ''}
			</Link>
			{menuSections.slice(3, 5).map(menuItem => (
				<Section
					key={menuItem.id}
					menuItem={{ ...menuItem, title: '' }}
				/>
			))}
		</div>
	) : (
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

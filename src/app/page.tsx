'use client'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ArrowRight } from '../../public'
import { Carousel } from '../components/carousel/Carousel'
import { Categories } from '../components/category/Categories'
import { menuSections } from '../components/menu-bar/menu.data'
import { NewsFeed } from '../components/news-feed/NewsFeed'
import { useAccountStore } from '../store/account.store'
import { useAppStore } from '../store/app.store'
import { useCarouselStore } from '../store/carousel.store'
import { useCategoryStore } from '../store/category.store'
import './page.scss'

export default function Page() {
  const pathname = usePathname()
  const sections = menuSections.find(menuItem => menuItem.href === pathname)
  const { currentCarouselData } = useCarouselStore()
  const { selectTopCategories } = useCategoryStore()
  const { isMobile } = useAppStore()
  const { isLoggedIn } = useAccountStore()

  // HydrationWarning
  const [isClient, setIsClient] = useState(false)
  useEffect(() => setIsClient(true))
  if (!isClient) return null
  // HydrationWarning

  return (
    <div className='content'>
      {isMobile ? (
        <>
          <h3>
            {isLoggedIn() ? (
              <>
                {sections?.image}
                {sections?.title}
              </>
            ) : (
              <>
                {sections?.title} <ArrowRight alt='arrow-right' />
              </>
            )}
          </h3>
          <Categories categories={selectTopCategories(5)} />
          <Carousel carouselData={currentCarouselData} />
          <NewsFeed />
        </>
      ) : (
        <>
          <Categories categories={selectTopCategories(5)} />
          <section className='stories'>
            <div className='stories__header'>
              <h3>Истории</h3>
              <button onClick={() => console.log('simulate redirect')}>
                <samp>Смотреть все</samp>
                <ArrowRight />
              </button>
            </div>
            <Carousel carouselData={currentCarouselData} />
            <NewsFeed />
          </section>
        </>
      )}
    </div>
  )
}

'use client'
import { ArrowRight } from '../../public'
import { Carousel } from '../components/carousel/Carousel'
import { Categories } from '../components/category/Categories'
import { NewsFeed } from '../components/news-feed/NewsFeed'
import { useCarouselStore } from '../store/carousel.store'
import { useCategoryStore } from '../store/category.store'
import './page.scss'

export default function Page() {
  const { currentCarouselData } = useCarouselStore()
  const { selectTopCategories } = useCategoryStore()
  return (
    <div className='content'>
      <Categories categories={selectTopCategories(5)} />
      <section className='stories'>
        <span className='stories__header'>
          <h3>Истории</h3>
          <button onClick={() => console.log('simulate redirect')}>
            Смотреть все
            <ArrowRight fill='#EB6F65' />
          </button>
        </span>
        <Carousel carouselData={currentCarouselData} />
        {/* <div style={{ backgroundColor: '#EB6F65', width: '100%', height: '1px' }}></div> */}
        <NewsFeed />
      </section>
    </div>
  )
}

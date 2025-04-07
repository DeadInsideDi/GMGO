import { create } from 'zustand'
import { TCarousel, carouselData } from '../components/carousel/carousel.data'

export interface ICarouselStore {
  currentCarouselData: TCarousel[]
  setCurrentCarousel: (carousel: TCarousel[]) => void
}

export const useCarouselStore = create<ICarouselStore>(set => ({
  currentCarouselData: carouselData,
  setCurrentCarousel: carousel => set({ currentCarouselData: carousel }),
}))

import { create } from 'zustand'
export type TPostsFilterState = 'Popular' | 'Latest' | 'My Subscriptions'

export interface IAppStore {
  postsFilterState: TPostsFilterState
  setPostsFilterState: (state: TPostsFilterState) => void

  burgerState: boolean
  toggleBurgerState: () => void

  isDialogOpen: boolean
  setIsDialogOpen: (state: boolean) => void

  isMobile: boolean
  setIsMobileByWidth: (width: number) => void
}

export const useAppStore = create<IAppStore>((set, get) => ({
  postsFilterState: 'Popular',
  setPostsFilterState: state => set({ postsFilterState: state }),

  burgerState: true,
  toggleBurgerState: () => set({ burgerState: !get().burgerState }),

  isDialogOpen: false,
  setIsDialogOpen: state => set({ isDialogOpen: state }),

  isMobile: false,
  setIsMobileByWidth: width => set({ isMobile: width <= 768 }),
}))

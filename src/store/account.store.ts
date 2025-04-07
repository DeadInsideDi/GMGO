import { create } from 'zustand'
export type TAccount = {
  id: number
  name: string
  fullName: string // surname это не отчество! Поэтому fullName
  avatar: string
  privacyInfo: {
    viewedPostIds: number[]
    viewedStoryIds: number[]
    likedPostIds: number[]
    DislikedPostIds: number[]
    FavoritePostIds: number[]
    SubscribedAccountIds: number[]
  }
}
type TPostsFilterState = 'Popular' | 'Latest' | 'My Subscriptions'
export interface IAccountStore {
  account: TAccount
  postsFilterState: TPostsFilterState
  setPostsFilterState: (state: TPostsFilterState) => void
  isViewedPost: (id: number) => boolean
  isViewedStory: (id: number) => boolean
}

export const useAccountStore = create<IAccountStore>((set, get) => ({
  account: {
    id: 0,
    name: '',
    fullName: '',
    avatar: '',
    privacyInfo: {
      viewedStoryIds: [1],
      viewedPostIds: [1],
      likedPostIds: [2],
      DislikedPostIds: [3],
      FavoritePostIds: [2],
      SubscribedAccountIds: [3],
    },
  },
  postsFilterState: 'Popular',
  setPostsFilterState: state => set({ postsFilterState: state }),
  isViewedPost: id => get().account.privacyInfo.viewedPostIds.includes(id),
  isViewedStory: id => get().account.privacyInfo.viewedStoryIds.includes(id),
}))

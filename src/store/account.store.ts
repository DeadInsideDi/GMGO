import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { useAccountsStore } from './accountsServer.store'
import { usePostsStore } from './posts.store'

// NO SYNC!!!

export type TAccount = {
  id: number
  name: string
  fullName: string // surname это не отчество! Поэтому fullName
  avatar: string
  privacyInfo: {
    email: string
    password: string
    unreadMessages: number
    viewedPostIds: number[]
    viewedStoryIds: number[]
    likedPostIds: number[]
    dislikedPostIds: number[]
    favoritePostIds: number[]
    subscribedAccountIds: number[]
  }
}

export interface IAccountStore {
  account: TAccount
  isViewedPost: (id: number) => boolean
  isViewedStory: (id: number) => boolean
  isLikedPost: (id: number) => boolean
  isDislikedPost: (id: number) => boolean
  isFavoritePost: (id: number) => boolean
  isSubscribedAccount: (id: number) => boolean
  // setViewedPost: (id: number) => void
  // setViewedStory: (id: number) => void

  toggleLikePost: (id: number) => boolean
  toggleDislikePost: (id: number) => boolean
  toggleFavoritePost: (id: number) => boolean

  setViewedPost: (id: number) => void
  setViewedStory: (id: number) => void

  login: (email: string) => void
  setEmail: (email: string) => void
  setPassword: (password: string) => void

  isLoggedIn: () => boolean
}

export const useAccountStore = create<IAccountStore>()(
  persist(
    immer((set, get) => ({
      account: {
        id: 0,
        name: '',
        fullName: '',
        avatar: '',
        privacyInfo: {
          unreadMessages: 0,
          email: '',
          password: '',
          viewedStoryIds: [1],
          viewedPostIds: [1],
          likedPostIds: [2],
          dislikedPostIds: [3],
          favoritePostIds: [2],
          subscribedAccountIds: [3],
        },
      },

      isViewedPost: id => get().account.privacyInfo.viewedPostIds.includes(id),
      isViewedStory: id => get().account.privacyInfo.viewedStoryIds.includes(id),
      isLikedPost: id => get().account.privacyInfo.likedPostIds.includes(id),
      isDislikedPost: id => get().account.privacyInfo.dislikedPostIds.includes(id),
      isFavoritePost: id => get().account.privacyInfo.favoritePostIds.includes(id),
      isSubscribedAccount: id => get().account.privacyInfo.subscribedAccountIds.includes(id),

      toggleLikePost: id => {
        set(state => {
          const { likedPostIds } = state.account.privacyInfo
          const isLiked = likedPostIds.includes(id)
          state.account.privacyInfo.likedPostIds = isLiked
            ? likedPostIds.filter(item => item !== id)
            : likedPostIds.concat(id)
          isLiked ? usePostsStore.getState().decrementLikes(id) : usePostsStore.getState().incrementLikes(id)

          if (!isLiked && state.account.privacyInfo.dislikedPostIds.includes(id)) {
            state.account.privacyInfo.dislikedPostIds = state.account.privacyInfo.dislikedPostIds.filter(
              item => item !== id,
            )
            usePostsStore.getState().decrementDislikes(id)
          }
        })

        return get().account.privacyInfo.likedPostIds.includes(id)
      },

      toggleDislikePost: id => {
        set(state => {
          const { dislikedPostIds } = state.account.privacyInfo
          const isDisiked = dislikedPostIds.includes(id)
          state.account.privacyInfo.dislikedPostIds = isDisiked
            ? dislikedPostIds.filter(item => item !== id)
            : dislikedPostIds.concat(id)

          isDisiked ? usePostsStore.getState().decrementDislikes(id) : usePostsStore.getState().incrementDislikes(id)

          if (!isDisiked && state.account.privacyInfo.likedPostIds.includes(id)) {
            state.account.privacyInfo.likedPostIds = state.account.privacyInfo.likedPostIds.filter(item => item !== id)
            usePostsStore.getState().decrementLikes(id)
          }
        })
        return get().account.privacyInfo.dislikedPostIds.includes(id)
      },

      toggleFavoritePost: id => {
        set(state => {
          const { favoritePostIds } = state.account.privacyInfo
          state.account.privacyInfo.favoritePostIds = favoritePostIds.includes(id)
            ? favoritePostIds.filter(item => item !== id)
            : favoritePostIds.concat(id)
        })
        return get().account.privacyInfo.favoritePostIds.includes(id)
      },
      setViewedPost: id => {
        set(state => {
          const { viewedPostIds } = state.account.privacyInfo
          if (!viewedPostIds.includes(id)) state.account.privacyInfo.viewedPostIds = viewedPostIds.concat(id)
        })
      },
      setViewedStory: id => {
        set(state => {
          const { viewedStoryIds } = state.account.privacyInfo
          if (!viewedStoryIds.includes(id)) state.account.privacyInfo.viewedStoryIds = viewedStoryIds.concat(id)
        })
      },

      login: email => {
        set(() => ({
          account: useAccountsStore.getState().getAccountByEmail(email),
        }))
      },

      setEmail: email =>
        set(state => {
          state.account.privacyInfo.email = email
        }),
      setPassword: password =>
        set(state => {
          state.account.privacyInfo.password = password
        }),

      isLoggedIn: () => get().account.id !== 0,
    })),
    {
      name: 'account-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
